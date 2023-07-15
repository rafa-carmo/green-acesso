import { Land } from '@/app/entities/land'
import { LandRepository } from '@/app/repositories/landRepository'
import { prisma } from '@/lib/prisma'

export class PrismaLandRepository implements LandRepository {
  async create(land: Land): Promise<void> {
    await prisma.land.create({
      data: {
        name: land.name,
        createdAt: land.createdAt,
        active: !!land.active,
      },
    })
  }
  async getById(id: number): Promise<Land> {
    const find = await prisma.land.findFirst({
      where: {
        id,
      },
    })
    if (find) {
      return new Land(find)
    }
    throw new Error('Land not found.')
  }
  async findByName(name: string | number): Promise<Land | null> {
    const find = await prisma.land.findFirst({
      where: {
        name: {
          contains: String(name).padStart(4, '0'),
        },
      },
    })
    if (find) {
      return new Land(find)
    }
    return null
  }
}
