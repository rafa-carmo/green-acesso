import { BankSlip } from '@/app/entities/bankSlip'

export interface BankSlipRepository {
  create(bankSlip: BankSlip): Promise<void>
  list(): Promise<BankSlip[]>
}
