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
    if (request.initialValue && isNaN(request.initialValue!)) {
      throw new Error('Valor inicial deve ser um número')
    }
    if (request.finalValue && isNaN(request.finalValue!)) {
      throw new Error('Valor final deve ser um número')
    }
    if (request.idLand && isNaN(request.idLand!)) {
      throw new Error('Id do lote deve ser um número')
    }

    return this.bankSlipRepository.findMany({ ...request })
  }
}
