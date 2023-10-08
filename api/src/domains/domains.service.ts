import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as tls from 'tls';
import * as http from 'http';

import { Domain, DomainStatus } from './entities/domain.entity';
import createDomainDto from './dto/create-domain.dto';
import domainConfig from 'src/config/domain.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class DomainsService {
  constructor(
    @InjectRepository(Domain)
    private readonly domainsRepository: Repository<Domain>,
    @Inject(domainConfig.KEY)
    private readonly config: ConfigType<typeof domainConfig>,
  ) {}

  async findAll(): Promise<Domain[]> {
    return await this.domainsRepository.find();
  }

  async findById(id: number): Promise<Domain> {
    return await this.domainsRepository.findOneBy({ id });
  }

  async create(domain: createDomainDto): Promise<Domain> {
    try {
      const newDomain = this.domainsRepository.create(domain);
      return await this.updateCert(newDomain);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async checkCert(id: number): Promise<Domain> {
    const domain = await this.domainsRepository.findOne({ where: { id } });
    return await this.updateCert(domain);
  }

  async updateCert(domain: Domain): Promise<Domain> {
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

      return await this.domainsRepository.save(domain);
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
