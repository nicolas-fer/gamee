import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { BaseModel } from "../models/base";
import { GameeResponse } from "../models/gameeResponse";

export abstract class BaseService<T extends BaseModel<TId>, TId> {
  private apiUrl: string;
  constructor(
    protected httpClient: HttpClient,
    protected apiEndpoint: string
  ) { 
    this.apiUrl = `${environment.API_BASE_URL}${apiEndpoint}`;
  }

  public get(): Observable<GameeResponse<T[]>> {
    return this.httpClient.get<GameeResponse<T[]>>(`${this.apiUrl}`);
  }

  public getById(id: number): Observable<GameeResponse<T>> {
    return this.httpClient.get<GameeResponse<T>>(`${this.apiUrl}/${id}`);
  }

  public create(model: T): Observable<GameeResponse<T>> {
    return this.httpClient.post<GameeResponse<T>>(`${this.apiUrl}`, model);
  }

  public update(model: T): Observable<GameeResponse<T>> {
    return this.httpClient
      .put<GameeResponse<T>>(`${this.apiUrl}`, model);
  }

  public delete(id: number): Observable<GameeResponse<T>> {
    return this.httpClient.delete<GameeResponse<T>>(`${this.apiUrl}/${id}`);
  }
}