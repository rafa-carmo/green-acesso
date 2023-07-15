import { findController } from '@/app/controllers/bankSlips'

import { Router } from 'express'

export const bankSlipRoutes = Router()

bankSlipRoutes.get('/boletos', (request, response) => {
  return findController.handler(request, response)
})
