import { Land } from '@/app/entities/land'
import { LandRepository } from '@/app/repositories/landRepository'

interface CreateLandRequest {
  name: string
  active: boolean
}

export class CreateLand {
  constructor(private readonly landRepository: LandRepository) {}
  async execute(request: CreateLandRequest) {
    const land = new Land(request)
    await this.landRepository.create(land)
  }
}
