import { inject, injectable } from 'tsyringe';

import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../../domain/entities/user.entity';
import { DomainError } from '../../../../core/domain/errors/domain.error';
import { IUserRepository } from '../../domain/repositories/user.repository';
import { IEncoderProvider } from '../../../../infra/providers/encoder/encoder.provider';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('EncoderProvider')
    private encoderProvider: IEncoderProvider
  ) {}

  async execute(data: CreateUserDto): Promise<void> {
    const emailAlreadyInUse = await this.userRepository.findByEmail(data.email);

    if (emailAlreadyInUse) {
      throw new DomainError('Email already in use');
    }

    const phoneAlreadyInUse = await this.userRepository.findByPhone(data.phone);

    if (phoneAlreadyInUse) {
      throw new DomainError('Phone already in use');
    }

    const user = new User();

    const password = await this.encoderProvider.encode(data.password);

    Object.assign(user, { ...data, password });

    await this.userRepository.create(user);
  }
}