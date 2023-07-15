import { BankSlip } from '@/app/entities/bankSlip'
import { Land } from '@/app/entities/land'
import { InMemoryBankSlipRepository } from 'test/repositories/in-memory-bank-slip-repository'
import { InMemoryLandRepository } from 'test/repositories/in-memory-land-repository'
import { ListBankSlips } from './list-bank-slip'

describe('list all bank slips', () => {
  it('list all bank slips', async () => {
    const landRepository = new InMemoryLandRepository()
    const bankSlipRepository = new InMemoryBankSlipRepository()

    await landRepository.create(new Land({ id: 1, name: '001', active: true }))
    await landRepository.create(new Land({ id: 2, name: '002', active: true }))

    const bankSlip = new ListBankSlips(bankSlipRepository)

    await bankSlipRepository.create(
      new BankSlip({
        name_payer: 'Teste',
        landId: 1,
        value: 1,
        payment_code: 'teste',
      }),
    )
    await bankSlipRepository.create(
      new BankSlip({
        name_payer: 'Teste',
        landId: 2,
        value: 1,
        payment_code: 'teste',
      }),
    )
    const bankSlips = await bankSlip.execute()
    expect(bankSlips).toHaveLength(2)
  })
})
