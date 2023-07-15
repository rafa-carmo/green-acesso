import { FindManyRequest } from '@/app/use-cases/bankSlip/filter-bank-slips'
import { DomainFindManyRequest } from '@/types/requestBankSlip'
import { convertToNumberIfPossible } from '@/utils/convertNumber'
import { BankSlip as RawBankSlip } from '@prisma/client'

export class PrismaSearchBankSlip {
  static toPrisma(bankSlip: DomainFindManyRequest): FindManyRequest {
    return {
      name: bankSlip.nome,
      initialValue: convertToNumberIfPossible(bankSlip.valor_inicial),
      finalValue: convertToNumberIfPossible(bankSlip.valor_final),
      idLand: convertToNumberIfPossible(bankSlip.id_lote),
    }
  }
  static toDomain(raw: RawBankSlip) {
    return {
      id: raw.id,
      nome: raw.name_payer,
      valor: raw.value,
      linha_digitavel: raw.payment_code,
    }
  }
}
