import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Client } from '../interfaces/client.interface';
import { Contact } from '../interfaces/contact.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientService {


  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }


  newClient(values:any){
    return this.http.post<any>(`${this.baseUrl}/clients/new`,values);
  }

  addBranch(branch:any){
    return this.http.post(`${this.baseUrl}/clients/newbranch`,branch);
  }

  getClients(){
    return this.http.get<Client[]>(`${this.baseUrl}/clients/allclients`);
  }


  getContacts(){
    return this.http.get<Contact[]>(`${this.baseUrl}/clients/allcontacts`);
  }


}
