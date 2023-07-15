import { Router } from 'express'
import multer from 'multer'
import {
  uploadCsvController,
  uploadPdfController,
} from '@/app/controllers/uploads'

const upload = multer({ dest: 'uploads/' })
export const uploadRoutes = Router()

uploadRoutes.post(
  '/upload_csv',
  upload.single('file'),
  async (request, response) => {
    return uploadCsvController.handler(request, response)
  },
)

uploadRoutes.post(
  '/upload_pdf',
  upload.single('file'),
  async (request, response) => {
    return uploadPdfController.handler(request, response)
  },
)
