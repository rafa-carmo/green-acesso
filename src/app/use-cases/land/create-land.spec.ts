import { Land } from '@/app/entities/land'
import { InMemoryLandRepository } from 'test/repositories/in-memory-land-repository'

describe('create land', () => {
  it('should create a land', async () => {
    const land = new Land({
      name: 'Teste',
      active: true,
    })
    const landRepository = new InMemoryLandRepository()
    await landRepository.create(land)

    expect(landRepository.lands).toHaveLength(1)
  })
})
