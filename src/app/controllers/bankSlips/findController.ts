import { BankSlipRepository } from '@/app/repositories/bankSlipRepository'
import { PrismaSearchBankSlip } from '@/infra/database/mappers/prisma-search-bank-slip'
import { createPdf } from '@/lib/pdf'
import { Request, Response } from 'express'

export class FindController {
  constructor(private bankSlipRepository: BankSlipRepository) {}
  async handler(request: Request, response: Response) {
    const { relatorio } = request.query
    if (relatorio && relatorio === '1') {
      const bankSlips = await this.bankSlipRepository.list()

      const pdfB64 = await createPdf({
        keys: ['id', 'Nome', 'Lote ID', 'Valor', 'Linha Digitável'],
        values: bankSlips,
      })
      return response.send({ base64: pdfB64 })
    }
    const query = PrismaSearchBankSlip.toPrisma(request.query)
    response.send(await this.bankSlipRepository.findMany(query))
  }
}
