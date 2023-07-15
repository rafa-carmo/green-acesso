import { Request, Response } from 'express'

import { CreateLand } from '@/app/use-cases/land/create-land'

import { CreateBankSlip } from '@/app/use-cases/bankSlip/create-bank-slip'
import { createReadStream, unlink } from 'node:fs'
import { GenericStringObject } from '@/types/generics'

import { parse } from 'csv'

export class UploadCsvController {
  constructor(
    private readonly createLand: CreateLand,
    private readonly createBankSlip: CreateBankSlip,
  ) {}
  async handler(request: Request, response: Response) {
    if (!request.file) {
      response.status(400).send('No file')
    }

    const fields = ['name', 'unidade', 'valor', 'linha_digitavel']
    const file = request!.file

    response
      .status(200)
      .send(
        'Arquivo carregado com sucesso, assim que estiver concluido enviaremos um email para informa-lo',
      )

    const readStream = createReadStream(file!.path)
      .pipe(parse({ delimiter: ';', from_line: 2 }))
      .on('end', function () {
        unlink(file!.path, (err) => {
          if (err) throw err
        })
        console.info('finished')
      })
      .on('error', function (error) {
        console.error(error.message)
      })

    for await (const chunk of readStream) {
      const data: GenericStringObject = {}
      chunk.map((item: string, key: number) => (data[fields[key]] = item))

      await this.createLand.execute({
        name: data.unidade.padStart(4, '0'),
        active: true,
      })

      await this.createBankSlip.execute({
        name_payer: data.name,
        value: Number(data.valor),
        landName: data.unidade,
        payment_code: data.linha_digitavel,
        active: true,
      })

      console.log(data.name, 'criado com sucesso')
    }
  }
}
