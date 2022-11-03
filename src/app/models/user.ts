import { BaseModel } from "../base/models/base";

export class User extends BaseModel<number>{
  username: string;
  password: string;
  role: string;
  token: string;

  constructor(id: number,
              username: string,
              password: string,
              role: string,
              token: string) {
    super(id);
    
    this.username = username;
    this.password = password;
    this.role = role;
    this.token = token;
  }
}