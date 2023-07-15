import { ToDomainResponse } from '@/types/requestBankSlip'
import { simpleFormatDate } from '@/utils/formatDate'
import { convertToCurrency } from '@/utils/valueConvert'
import { createIfNotExsitsFolder } from '@/utils/virifyFolder'
import fs from 'node:fs'
import path from 'node:path'
import { PDFDocument, PDFPage, StandardFonts } from 'pdf-lib'

interface SplitPdfData {
  pdfFilePath: string
  outputDirectory: string
  fileName: string
  pageNumber: number
}

export async function splitPdf({
  fileName,
  outputDirectory,
  pdfFilePath,
  pageNumber,
}: SplitPdfData) {
  await createIfNotExsitsFolder(outputDirectory)
  const data = await fs.promises.readFile(pdfFilePath)
  const readPdf = await PDFDocument.load(data)

  const writePdf = await PDFDocument.create()
  const [page] = await writePdf.copyPages(readPdf, [pageNumber])
  writePdf.addPage(page)
  const bytes = await writePdf.save()
  const outputPath = path.join(outputDirectory, `${fileName}.pdf`)
  await fs.promises.writeFile(outputPath, bytes)
  console.log(`Added ${outputPath}`)
}

interface CreateRowProps {
  page: PDFPage
  positionKey: number
  values: string[]
  isHead?: boolean
}
function createRow({ page, positionKey, values, isHead }: CreateRowProps) {
  page.drawText(values[0], {
    x: 20,
    y: isHead ? 600 : 570 - 20 * positionKey,
    size: 10,
  })
  page.drawText(values[1], {
    x: 50,
    y: isHead ? 600 : 570 - 20 * positionKey,
    size: 10,
  })

  page.drawText(values[2], {
    x: page.getWidth() - 300,
    y: isHead ? 600 : 570 - 20 * positionKey,
    size: 10,
  })
  page.drawText(values[3], {
    x: page.getWidth() - 250,
    y: isHead ? 600 : 570 - 20 * positionKey,
    size: 10,
  })

  page.drawText(values[4], {
    x: page.getWidth() - 155,
    y: isHead ? 600 : 570 - 20 * positionKey,
    size: 10,
  })

  page.drawLine({
    start: {
      x: 18,
      y: isHead ? 595 : 565 - 20 * positionKey,
    },
    end: {
      x: 500,
      y: isHead ? 595 : 565 - 20 * positionKey,
    },
  })
}

interface CreatePdfProps {
  keys: string[]
  values: ToDomainResponse[]
}
export async function createPdf({ keys, values }: CreatePdfProps) {
  const newPdf = await PDFDocument.create()
  const timesRomanFont = await newPdf.embedFont(StandardFonts.Helvetica)
  const pages: PDFPage[] = [newPdf.addPage([550, 750])]

  pages[0].setFont(timesRomanFont)
  newPdf.setTitle('Relatório de boletos')
  pages[0].drawText('Relatório de boletos', { x: 20, y: 670, size: 45 })
  pages[0].drawText('Página 01', {
    x: 400,
    y: 620,
    size: 15,
  })
  createRow({
    page: pages[0],
    positionKey: 0,
    values: keys,
    isHead: true,
  })

  let atualPage = 0
  for (let line = 0; line < values.length; line += 27) {
    if (line !== 0) {
      atualPage += 1
      pages.push(newPdf.addPage([550, 750]))
      pages[atualPage].drawText(
        'Página ' + String(atualPage + 1).padStart(2, '0'),
        {
          x: 400,
          y: 620,
          size: 15,
        },
      )
      createRow({
        page: pages[atualPage],
        positionKey: 0,
        values: keys,
        isHead: true,
      })
    }

    values.slice(line, 27 + line).map((item, key) => {
      createRow({
        page: pages[atualPage],
        positionKey: key,
        values: [
          String(item.id),
          item.nome,
          String(item.local_id),
          convertToCurrency(item.valor),
          item.linha_digitavel,
        ],
      })
    })
  }
  await createIfNotExsitsFolder('relatorios')
  await fs.promises.writeFile(
    `relatorios/${simpleFormatDate()}.pdf`,
    await newPdf.save(),
  )
  return await newPdf.saveAsBase64({ dataUri: true })
}
