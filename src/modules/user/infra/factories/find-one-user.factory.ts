import { PrismaUserRepository } from '../prisma/prisma-user.repository';
import { FindOneUserUseCase } from '../../use-cases/find-one-user.use-case';

export function findOneUserFactory(): FindOneUserUseCase {
  const repository = new PrismaUserRepository();

  return new FindOneUserUseCase(repository);
}
