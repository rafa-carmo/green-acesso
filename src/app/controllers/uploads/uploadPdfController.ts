import { Request, Response } from 'express'
import { readFileSync, unlink } from 'node:fs'
import PdfParse from 'pdf-parse'
import { FindBankSlipByPayerName } from '@/app/use-cases/bankSlip/find-bank-slip-by-payer-name'
import { splitPdf } from '@/lib/pdf'
import { filter } from '@/utils/pdfParser'

export class UploadPdfController {
  constructor(
    private readonly findBankSlipByPayerName: FindBankSlipByPayerName,
  ) {}

  async handler(request: Request, response: Response) {
    if (!request.file) {
      response.status(400).send('No file')
    }
    response.send('Arquivo carregado com sucesso')
    const filePath = request.file!.path

    const readStream = readFileSync(filePath)
    const pdfStream = await PdfParse(readStream)

    const pages = pdfStream.text.split('\n\n')

    for (let p = 0; p < pages.length; p++) {
      const filterPayer = await filter(pages[p])

      if (!filterPayer || !filterPayer.payer) continue

      const payerDatabase = await this.findBankSlipByPayerName.execute(
        filterPayer.payer,
      )

      if (!payerDatabase) {
        console.error('Payer not found')
        continue
      }

      await splitPdf({
        fileName: `${payerDatabase.id}`,
        outputDirectory: 'boletos/',
        pageNumber: p - 1,
        pdfFilePath: filePath,
      })
    }
    unlink(filePath, (err) => {
      if (err) throw err
    })
  }
}
