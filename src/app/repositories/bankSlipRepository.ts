import { BankSlip } from '@/app/entities/bankSlip'
import { ToDomainResponse } from '@/types/requestBankSlip'

export interface FindManyQuery {
  name?: string
  initialValue?: number
  finalValue?: number
  idLand?: number
}
export interface BankSlipRepository {
  create(bankSlip: BankSlip): Promise<void>
  list(): Promise<ToDomainResponse[]>
  findByPayerName(payerName: string): Promise<ToDomainResponse | null>
  findMany({
    idLand,
    name,
    finalValue,
    initialValue,
  }: FindManyQuery): Promise<ToDomainResponse[] | []>
}
