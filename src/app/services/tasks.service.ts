import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Job } from '../interfaces/jobs.interface';
import { Schedule } from '../interfaces/schedule.interface';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }


  getTasks(){
    return this.http.get<any[]>(`${this.baseUrl}/jobs`);
  }

  getTask(id: number){
    return this.http.get<any>(`${this.baseUrl}/jobs/${id}`);
  }

  getSubTask(id: number){
    return this.http.get<any>(`${this.baseUrl}/jobs/subjob/${id}`);
  }

  addNoveltie(noveltie: any){
    return this.http.post(`${this.baseUrl}/jobs/newnovelty`,noveltie);
  }

  getJobs(){
    return this.http.get<Job[]>(`${this.baseUrl}/jobs`);
  }

  getSquedule(){
    return this.http.get<any[]>(`${this.baseUrl}/jobs/schedules`);
  }

  addSquedule(data: any){
    return this.http.post(`${this.baseUrl}/jobs/newschedule`,data);
  }
  
}
