import { BankSlip } from '@/app/entities/bankSlip'
import {
  BankSlipRepository,
  FindManyQuery,
} from '@/app/repositories/bankSlipRepository'
import { prisma } from '@/lib/prisma'
import { PrismaBankSlipMapper } from '../mappers/prisma-bank-slip'
import { ToDomainResponse } from '@/types/requestBankSlip'

export class PrismaBankSlipRepository implements BankSlipRepository {
  async create(bankSlip: BankSlip): Promise<void> {
    console.log(bankSlip)
    await prisma.bankSlip.create({
      data: {
        name_payer: bankSlip.name_payer,
        value: bankSlip.value,
        payment_code: bankSlip.payment_code,
        createdAt: bankSlip.createdAt,
        land: {
          connect: {
            id: bankSlip.landId,
          },
        },
      },
    })
  }
  async list(): Promise<ToDomainResponse[]> {
    const bankSlips = await prisma.bankSlip.findMany({
      include: {
        land: true,
      },
    })
    return bankSlips.map(PrismaBankSlipMapper.toDomain)
  }
  async findByPayerName(payerName: string): Promise<ToDomainResponse | null> {
    const bankSlip = await prisma.bankSlip.findFirst({
      where: {
        name_payer: payerName,
      },
      include: { land: true },
    })
    if (bankSlip) {
      return PrismaBankSlipMapper.toDomain(bankSlip)
    }
    return null
  }

  async findMany({
    idLand,
    name,
    finalValue,
    initialValue,
  }: FindManyQuery): Promise<ToDomainResponse[] | []> {
    const search = await prisma.bankSlip.findMany({
      where: {
        landId: idLand,
        name_payer: {
          contains: name,
        },
        value: {
          gte: initialValue,
          lte: finalValue,
        },
      },
      include: {
        land: true,
      },
    })

    if (search.length > 0) {
      return search.map(PrismaBankSlipMapper.toDomain)
    }
    return []
  }
}
