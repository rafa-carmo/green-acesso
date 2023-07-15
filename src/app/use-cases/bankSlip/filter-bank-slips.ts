/* eslint-disable camelcase */
import { BankSlipRepository } from '@/app/repositories/bankSlipRepository'

export interface FindManyRequest {
  name?: string
  initialValue?: number
  finalValue?: number
  idLand?: number
}
export class FilterBankSplits {
  constructor(private readonly bankSlipRepository: BankSlipRepository) {}
  async execute(request: FindManyRequest) {
    if (request.initialValue || request.finalValue) {
      if (isNaN(request.finalValue!) && isNaN(request.initialValue!)) {
        throw new Error('Valor inicial e final precisam ser números')
      }
    }

    this.bankSlipRepository.findMany({ ...request })
  }
}
