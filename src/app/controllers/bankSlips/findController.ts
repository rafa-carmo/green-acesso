import { FilterBankSplits } from '@/app/use-cases/bankSlip/filter-bank-slips'
import { ListBankSlips } from '@/app/use-cases/bankSlip/list-bank-slip'
import { PrismaSearchBankSlip } from '@/infra/database/mappers/prisma-search-bank-slip'
import { createPdf } from '@/lib/pdf'
import { Request, Response } from 'express'

export class FindController {
  constructor(
    private filterBankSlips: FilterBankSplits,
    private listBankSlips: ListBankSlips,
  ) {}
  async handler(request: Request, response: Response) {
    const { relatorio } = request.query
    if (relatorio && relatorio === '1') {
      const bankSlips = await this.listBankSlips.execute()

      const pdfB64 = await createPdf({
        keys: ['id', 'Nome', 'Lote ID', 'Valor', 'Linha Digitável'],
        values: bankSlips,
      })
      return response.send({ base64: pdfB64 })
    }
    try {
      const query = PrismaSearchBankSlip.toPrisma(request.query)
      const bankSlips = await this.filterBankSlips.execute(query)
      return response.send(bankSlips)
    } catch (error: any) {
      console.error(error)
      return response.status(400).send({ error: error.message })
    }
  }
}
