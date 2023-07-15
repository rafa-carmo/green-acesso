export interface BankSlipProps {
  id?: number
  name_payer: string
  landId?: number
  value: number
  payment_code: string
  active?: boolean
  createdAt?: Date
}

export class BankSlip {
  private props: BankSlipProps
  constructor(props: BankSlipProps) {
    this.props = {
      id: props.id,
      name_payer: props.name_payer,
      landId: props.landId,
      value: props.value,
      payment_code: props.payment_code,
      active: props.active,
      createdAt: new Date(),
    }
  }

  public get id(): number | undefined {
    return this.props.id
  }

  public set id(value: number) {
    this.props.id = value
  }

  public get name_payer(): string {
    return this.props.name_payer
  }

  public set name_payer(value: string) {
    this.props.name_payer = value
  }

  public get landId(): number | undefined {
    return this.props.landId
  }

  public set landId(value: number) {
    this.props.landId = value
  }

  public get value(): number {
    return this.props.value
  }

  public set value(value: number) {
    this.props.value = value
  }

  public get payment_code(): string {
    return this.props.payment_code
  }

  public set payment_code(value: string) {
    this.props.payment_code = value
  }

  public get active(): boolean {
    if (this.props.active) {
      return this.props.active
    }
    return true
  }

  public set active(value: boolean) {
    this.props.active = value
  }

  public get createdAt(): Date {
    return this.props.createdAt!
  }

  public set createdAt(value: Date) {
    this.props.createdAt = value
  }
}
