import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Client } from '../interfaces/client.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientService {


  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }


  newClient(values:any){
    return this.http.post<any>(`${this.baseUrl}/clients/new`,values);
  }

  getClients(){
    return this.http.get<Client[]>(`${this.baseUrl}/clients/allclients`);
  }


}
