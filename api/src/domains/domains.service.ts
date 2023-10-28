import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import * as tls from 'tls';

import { Domain, DomainStatus } from './entities/domain.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class DomainsService {
  constructor(
    @InjectRepository(Domain)
    private readonly domainsRepository: Repository<Domain>,
  ) {}

  async findAll(): Promise<Domain[]> {
    return await this.domainsRepository.find();
  }

  async findById(id: number): Promise<Domain> {
    return await this.domainsRepository.findOneBy({ id });
  }

  async create(
    { url, user }: { url: string; user: User },
    transactionManager?: EntityManager,
  ): Promise<Domain> {
    try {
      if (transactionManager) {
        return await transactionManager.save(Domain, { url, user });
      } else {
        return this.domainsRepository.create({ url, user });
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async checkCert(
    id: number,
    transactionManager?: EntityManager,
  ): Promise<Domain> {
    const domain = await this.domainsRepository.findOne({ where: { id } });
    if (!domain) {
      throw new NotFoundException('domain not found');
    }
    return await this.updateCert({ domain }, transactionManager);
  }

  async updateCert(
    { domain }: { domain: Domain },
    transactionManager?: EntityManager,
  ): Promise<Domain> {
    const parsedUrl = new URL(domain.url);
    const host = parsedUrl.hostname;

    try {
      await new Promise<void>((resolve, reject) => {
        const socket = tls.connect(
          {
            port: 443,
            host,
            servername: host,
          },
          () => {
            try {
              const certificate = socket.getPeerCertificate();
              domain.expiresAt = new Date(certificate.valid_to);
              domain.status = DomainStatus.VALID;
              domain.issurer = certificate.issuer.O;
              domain.lastCheckedAt = new Date();

              resolve();
            } catch (err) {
              reject(err);
            }
          },
        );

        socket.on('error', (err) => {
          domain.status = DomainStatus.INVALID;
          domain.lastCheckedAt = new Date();
          domain.errorMessage =
            err.code !== 'ERR_SSL_WRONG_VERSION_NUMBER'
              ? err.message
              : 'some error happens';
          resolve();
        });
      });

      if (transactionManager) {
        return await transactionManager.save(Domain, domain);
      } else {
        return await this.domainsRepository.save(domain);
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
