import { InMemoryLandRepository } from 'test/repositories/in-memory-land-repository'
import { CreateLand } from './create-land'

describe('create land', () => {
  it('should create a land', async () => {
    const landRepository = new InMemoryLandRepository()
    const createLand = new CreateLand(landRepository)

    await createLand.execute({
      name: 'Teste',
      active: true,
    })

    expect(landRepository.lands).toHaveLength(1)
  })
})
