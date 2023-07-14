import { Land } from '@/app/entities/land'
import { InMemoryBankSlipRepository } from 'test/repositories/in-memory-bank-slip-repository'
import { InMemoryLandRepository } from 'test/repositories/in-memory-land-repository'
import { CreateBankSlip } from './create-bank-slip'

describe('create bank slip', () => {
  it('shoud be create a bank slip by use-case', async () => {
    const landRepository = new InMemoryLandRepository()
    await landRepository.create(new Land({ id: 1, name: '0017', active: true }))

    const bankSlipRepository = new InMemoryBankSlipRepository()

    const createLand = new CreateBankSlip(landRepository, bankSlipRepository)
    await createLand.execute({
      name_receiver: 'Teste',
      value: 1,
      payment_code: 'teste',
      landName: 17,
    })
  })
})
