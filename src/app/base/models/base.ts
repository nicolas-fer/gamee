export class BaseModel<TId> {
  id: TId;

  constructor(id: TId) {
    this.id = id;
  }

  public toJson(): any {
    return JSON.parse(JSON.stringify(this));
  }
}