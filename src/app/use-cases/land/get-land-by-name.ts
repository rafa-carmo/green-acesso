import { LandRepository } from '@/app/repositories/landRepository'

export class GetLandByName {
  constructor(private readonly landRepository: LandRepository) {}
  async execute(name: string | number) {
    const land = await this.landRepository.findByName(name)
    if (land) {
      return land
    }
    throw new Error('Land not found')
  }
}
