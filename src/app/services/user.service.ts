import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment.development';

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

  loginOk(){
    this.isLogging.next(true);
  }

  logout(){
    localStorage.clear();
    this.isLogging.next(false);
  }
}
