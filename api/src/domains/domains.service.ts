import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as sslCertificate from 'get-ssl-certificate';

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
    const cert = await sslCertificate.get(domain.url, this.config.timeout);
    const newDomain = this.domainsRepository.create({
      ...domain,
      lastCheckedAt: new Date(),
      expiresAt: new Date(cert.valid_to),
      status: DomainStatus.CHECKED,
      issurer: cert.issuer.CN,
    });

    return await this.domainsRepository.save(newDomain);
  }
}
