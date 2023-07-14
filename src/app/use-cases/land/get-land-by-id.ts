import { LandRepository } from '@/app/repositories/landRepository'

export class GetLand {
  constructor(private readonly landRepository: LandRepository) {}
  async execute(id: number) {
    await this.landRepository.getById(id)
  }
}
