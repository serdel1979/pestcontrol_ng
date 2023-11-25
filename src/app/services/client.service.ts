import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Client } from '../interfaces/client.interface';
import { Contact } from '../interfaces/contact.interface';
import { ClientGet } from '../interfaces/client-get.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientService {


  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }


  newClient(values:any){
    return this.http.post<any>(`${this.baseUrl}/clients/new`,values);
  }

  addClientData(values:any){
    return this.http.post<any>(`${this.baseUrl}/clients/newclient`,values);
  }

  addBranch(branch:any){
    return this.http.post(`${this.baseUrl}/clients/newbranch`,branch);
  }

  getClients(){
    return this.http.get<Client[]>(`${this.baseUrl}/clients/allclients`);
  }

  getClientsDate(){
    return this.http.get<Client[]>(`${this.baseUrl}/clients/allclientsdate`);
  }

  getClient(id:number){
    return this.http.get<ClientGet>(`${this.baseUrl}/clients/getClient/${id}`);
  }


  getContacts(){
    return this.http.get<Contact[]>(`${this.baseUrl}/clients/allcontacts`);
  }

  addContact(data:any){
    return this.http.post<Contact[]>(`${this.baseUrl}/clients/addContact`,data);
  }

  getBranches(clientId: number){
    return this.http.get<any[]>(`${this.baseUrl}/clients/branches/${clientId}`);
  }

  deleteBranch(id:number){
    return this.http.delete(`${this.baseUrl}/clients/branch/delete/${id}`);
  }

  deleteContact(id:number){
    return this.http.delete(`${this.baseUrl}/clients/contact/delete/${id}`);
  }


}
