import { Land } from '@/app/entities/land'
import { LandRepository } from '@/app/repositories/landRepository'

export class InMemoryLandRepository implements LandRepository {
  public lands: Land[] = []
  async create(land: Land): Promise<void> {
    land.id = this.lands.length + 1
    this.lands.push(land)
  }

  async getById(id: number): Promise<Land | null> {
    const land = this.lands.find((land) => land.id === id)

    if (land) {
      return land
    }
    return null
  }
  async findByName(name: string | number) {
    // eslint-disable-next-line eqeqeq
    const land = this.lands.find((land) => land.name == name)

    if (land) {
      return land
    }
    return null
  }
}
