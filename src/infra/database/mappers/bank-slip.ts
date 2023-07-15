import { BankSlipProps } from '@/app/entities/bankSlip'
import { LandProps } from '@/app/entities/land'
import { ToDomainResponse } from '@/types/requestBankSlip'

export class BankSlipMapper {
  static toDomain(raw: BankSlipProps, land: LandProps): ToDomainResponse {
    return {
      id: raw.id!,
      nome: raw.name_payer,
      valor: raw.value,
      linha_digitavel: raw.payment_code,
      createdAt: raw.createdAt!,
      local_id: raw.landId!,
      active: raw.active!,
      lote: {
        id: land.id!,
        nome: land.name,
      },
    }
  }
}
