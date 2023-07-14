import { Land } from '../entities/land'

export interface LandRepository {
  create(Land: Land): Promise<void>
  getById(id: number): Promise<Land | null>
  findByName(name: string | number): Promise<Land | null>
}
