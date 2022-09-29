import { BaseModel } from "../base/models/base";

export class Team extends BaseModel<number>{
  name: string;
  primaryColor: string;
  secondaryColor: string;

  constructor(id: number,
              name: string,
              primaryColor: string,
              secondaryColor: string) {
    super(id);
    this.name = name;
    this.primaryColor = primaryColor;
    this.secondaryColor = secondaryColor;
  }
}