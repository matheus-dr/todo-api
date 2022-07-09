import { ICriticalityLevelRepository } from '../core/repositories/criticality-level.repository';
import { CriticalityLevelEntity } from '../core/entities/criticality-level.entity';
import { DomainError } from '../../../core/domain/errors/domain.error';

export class FindOneCriticalityLevelUseCase {
  constructor(
    private defaultCriticalityLevelRepository: ICriticalityLevelRepository
  ) {}

  async execute(id: string): Promise<CriticalityLevelEntity> {
    const criticalityLevel =
      await this.defaultCriticalityLevelRepository.findOne(id);

    if (!criticalityLevel) {
      throw new DomainError('Criticality level not found');
    }

    return criticalityLevel;
  }
}
