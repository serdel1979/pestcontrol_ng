import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = environment.baseUrl;

  public isLogging: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) { }


  login(values:any){
    return this.http.post<any>(`${this.baseUrl}/users/login`,values);
  }


  get subsLogued(){
    return this.isLogging;
  }

  loginOk(){
    this.isLogging.next(true);
  }

  logout(){
    localStorage.clear();
    this.isLogging.next(false);
  }


  isLogued(){
    let token = localStorage.getItem('token');
    if (token != null) {
      let jwt: any;
      jwt = jwt_decode(token);
  
      let fechaExpira = new Date(jwt.exp * 1000);
      let currentDate = new Date();
      
      let dif = fechaExpira.getTime() - currentDate.getTime(); // Diferencia en milisegundos
      if (fechaExpira  > currentDate) return true;
    }
    return false;
  }





}


