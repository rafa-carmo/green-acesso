import { toDomainLand } from './requestLand'

export interface DomainFindManyRequest {
  nome?: string
  valor_inicial?: number
  valor_final?: number
  id_lote?: number
}

export interface ToDomainResponse {
  id: number
  nome: string
  valor: number
  linha_digitavel: string
  createdAt: Date
  local_id: number
  active: boolean
  lote?: toDomainLand
}
