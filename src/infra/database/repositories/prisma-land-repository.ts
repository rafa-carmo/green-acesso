import { Land } from '@/app/entities/land'
import { LandRepository } from '@/app/repositories/landRepository'

export class PrismaLandRepository implements LandRepository {
  create(Land: Land): Promise<void> {
    throw new Error('Method not implemented.')
  }
  getById(id: number): Promise<Land> {
    throw new Error('Method not implemented.')
  }
}
