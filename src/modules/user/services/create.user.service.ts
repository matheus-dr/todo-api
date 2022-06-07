import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';

import { UserDTO } from '../dto/user.dto';
import { PrismaUserRepository } from '../repositories/prisma.user.repository';
import { BcryptEncoderProvider } from '../../../providers/bcrypt.encoder.provider';

@Injectable()
export class CreateUserService {
  constructor(
    private repository: PrismaUserRepository,
    private encoderProvider: BcryptEncoderProvider
  ) {}

  public async execute(data: UserDTO): Promise<void> {
    const hashedPassword = await this.encoderProvider.encode(data.password);

    await this.repository.create({
      ...data,
      password: hashedPassword,
      id: uuid(),
    });
  }
}
