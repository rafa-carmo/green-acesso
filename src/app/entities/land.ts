export interface LandProps {
  id?: number
  name: string
  active?: boolean
  bank_slips?: number[]
  createdAt?: Date
}

export class Land {
  private props: LandProps
  constructor(props: LandProps) {
    this.props = {
      id: props.id,
      name: props.name,
      active: !!props.active,
      bank_slips: props.bank_slips,
      createdAt: new Date(),
    }
  }

  public get id(): number | undefined {
    return this.props.id
  }

  public set id(value: number | undefined) {
    this.props.id = value
  }

  public get name(): string {
    return this.props.name
  }
  public set name(value: string) {
    this.props.name = value
  }

  public get active(): boolean {
    return !!this.props.active
  }
  public set active(value: boolean) {
    this.props.active = value
  }

  public get bank_slips(): number[] | undefined {
    return this.props.bank_slips
  }
  public set bank_slips(value: number[] | undefined) {
    this.props.bank_slips = value
  }

  public get createdAt(): Date {
    if (this.props.createdAt) {
      return this.props.createdAt
    }
    return new Date()
  }
}
