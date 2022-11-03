import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { LocalStorageService } from "src/app/services/local-storage.service";
import { environment } from "src/environments/environment";
import { BaseModel } from "../models/base";
import { GameeResponse } from "../models/gameeResponse";

export abstract class BaseService<T extends BaseModel<TId>, TId> {
  protected apiUrl: string;
  constructor(
    private _localSotarageService: LocalStorageService,
    protected httpClient: HttpClient,
    protected apiEndpoint: string
  ) { 
    this.apiUrl = `${environment.API_BASE_URL}${apiEndpoint}`;
  }

  public get(): Observable<GameeResponse<T[]>> {   
    
    return this.httpClient.get<GameeResponse<T[]>>(`${this.apiUrl}`, this.getHeader());
  }

  public getById(id: number): Observable<GameeResponse<T>> {
    return this.httpClient.get<GameeResponse<T>>(`${this.apiUrl}/${id}`, this.getHeader());
  }

  public create(model: T): Observable<GameeResponse<T>> {
    return this.httpClient.post<GameeResponse<T>>(`${this.apiUrl}`, model, this.getHeader());
  }

  public update(model: T): Observable<GameeResponse<T>> {
    return this.httpClient
      .put<GameeResponse<T>>(`${this.apiUrl}`, model, this.getHeader());
  }

  public delete(id: number): Observable<GameeResponse<T>> {
    return this.httpClient.delete<GameeResponse<T>>(`${this.apiUrl}/${id}`, this.getHeader());
  }

  private getHeader(){
    const jwt = this._localSotarageService.get("SESSION_TOKEN");

    const headers = new HttpHeaders(jwt?{
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    }:{
      'Content-Type': 'application/json'
    });
    const requestOptions = { headers: headers };

    return requestOptions;
  }
}