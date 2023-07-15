import { ToDomainResponse } from '@/types/requestBankSlip'
import { BankSlip as RawBankSlip, Land as RawLand } from '@prisma/client'

type BankSlipRaw = {
  land: RawLand
} & RawBankSlip

export class PrismaBankSlipMapper {
  static toDomain(raw: BankSlipRaw): ToDomainResponse {
    return {
      id: raw.id,
      nome: raw.name_payer,
      valor: raw.value,
      linha_digitavel: raw.payment_code,
      createdAt: raw.createdAt,
      local_id: raw.landId,
      active: raw.active,
      lote: {
        id: raw.land.id,
        nome: raw.land.name,
      },
    }
  }
}
