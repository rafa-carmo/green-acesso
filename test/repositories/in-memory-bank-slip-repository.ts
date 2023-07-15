import { BankSlip } from '@/app/entities/bankSlip'
import {
  BankSlipRepository,
  FindManyQuery,
} from '@/app/repositories/bankSlipRepository'
import { BankSlipMapper } from '@/infra/database/mappers/bank-slip'
import { ToDomainResponse } from '@/types/requestBankSlip'

export class InMemoryBankSlipRepository implements BankSlipRepository {
  constructor() {}
  public bankSlips: BankSlip[] = []
  async create(bankSlip: BankSlip): Promise<void> {
    bankSlip.id = this.bankSlips.length + 1
    bankSlip
    this.bankSlips.push(bankSlip)
  }
  async list(): Promise<ToDomainResponse[]> {
    return this.bankSlips.map((bankSlip) =>
      BankSlipMapper.toDomain(bankSlip, { name: String(bankSlip.landId) }),
    )
  }
  async findByPayerName(payerName: string): Promise<ToDomainResponse | null> {
    const bankSlip = this.bankSlips.find(
      (bankSlip) => bankSlip.name_payer === payerName,
    )
    if (bankSlip) {
      return BankSlipMapper.toDomain(bankSlip, {
        name: String(bankSlip.landId),
      })
    }
    return null
  }
  findMany({
    idLand,
    name,
    finalValue,
    initialValue,
  }: FindManyQuery): Promise<ToDomainResponse[] | []> {
    throw new Error('Method not implemented.')
  }
}
