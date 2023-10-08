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

  async create(domain: createDomainDto) {
    try {
      const parsedUrl = new URL(domain.url);
      const host = parsedUrl.hostname;
      const newDomain = this.domainsRepository.create({
        ...domain,
        lastCheckedAt: new Date(),
      });

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
              newDomain.expiresAt = new Date(certificate.valid_to);
              newDomain.status = DomainStatus.VALID;
              newDomain.issurer = certificate.issuer.O;
              resolve();
            } catch (err) {
              reject(err);
            }
          },
        );

        socket.on('error', (err) => {
          newDomain.status = DomainStatus.INVALID;
          newDomain.errorMessage =
            err.code !== 'ERR_SSL_WRONG_VERSION_NUMBER'
              ? err.message
              : 'some error happens';
          resolve();
        });
      });

      return await this.domainsRepository.save(newDomain);
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
