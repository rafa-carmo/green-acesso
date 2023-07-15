import { InMemoryBankSlipRepository } from 'test/repositories/in-memory-bank-slip-repository'
import { CreateBankSlip } from './create-bank-slip'
import { InMemoryLandRepository } from 'test/repositories/in-memory-land-repository'

import { Land } from '@/app/entities/land'
import { FindBankSlipByPayerName } from './find-bank-slip-by-payer-name'

describe('find bank slip by payer name', () => {
  it('should be find bank slip by payer name', async () => {
    const bankSlipRepository = new InMemoryBankSlipRepository()
    const landRepository = new InMemoryLandRepository()
    await landRepository.create(new Land({ id: 1, name: '0017', active: true }))
    const createBankSlip = new CreateBankSlip(
      landRepository,
      bankSlipRepository,
    )

    await createBankSlip.execute({
      name_payer: 'Teste',
      value: 1,
      payment_code: 'teste',
      landName: 17,
    })
    const findBankSlipByPayerName = new FindBankSlipByPayerName(
      bankSlipRepository,
    )

    const result = await findBankSlipByPayerName.execute('Teste')

    expect(result).not.toBeNull()
  })
})
