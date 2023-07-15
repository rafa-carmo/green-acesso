import { FindManyRequest } from '@/app/use-cases/bankSlip/filter-bank-slips'
import { DomainFindManyRequest } from '@/types/requestBankSlip'
import { BankSlip as RawBankSlip } from '@prisma/client'

export class PrismaSearchBankSlip {
  static toPrisma(bankSlip: DomainFindManyRequest): FindManyRequest {
    return {
      name: bankSlip.nome,
      initialValue: bankSlip.valor_inicial && Number(bankSlip.valor_inicial),
      finalValue: bankSlip.valor_final && Number(bankSlip.valor_final),
      idLand: bankSlip.id_lote && Number(bankSlip.id_lote),
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
