export abstract class Entity {
  readonly _id!: string | undefined;

  constructor(values: any) {
    this._id = values ? values._id : undefined;
  }
}
