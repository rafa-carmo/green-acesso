import { Land } from '@/app/entities/land'
import { InMemoryLandRepository } from 'test/repositories/in-memory-land-repository'

describe('get land by id', () => {
  it('should be return a land', async () => {
    const landRepository = new InMemoryLandRepository()
    await landRepository.create(
      new Land({
        name: 'Teste',
        active: true,
      }),
    )
    await landRepository.create(
      new Land({
        name: 'Teste',
        active: true,
      }),
    )
    await landRepository.create(
      new Land({
        name: 'Teste',
        active: true,
      }),
    )

    const landFinded = await landRepository.getById(2)

    expect(landFinded).not.toBeNull()
  })
})
