import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Job, JobType } from '../interfaces/jobs.interface';
import { Schedule } from '../interfaces/schedule.interface';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }



  saveTypes(data:JobType[]){
    return this.http.post(`${this.baseUrl}/jobs/addTypes`,data);
  }

  getTasks(){
    return this.http.get<any[]>(`${this.baseUrl}/jobs`);
  }

  getTypeTasks(){
    return this.http.get<any[]>(`${this.baseUrl}/jobs/types`);
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

  getSquedules(){
    return this.http.get<any[]>(`${this.baseUrl}/jobs/schedules`);
  }

  
  getSquedule(id:number){
    return this.http.get<Schedule>(`${this.baseUrl}/jobs/schedule/${id}`);
  }

  editSquedule(id:number, data: any){
    return this.http.put(`${this.baseUrl}/jobs/schedule/edit/${id}`,data);
  }

  deletSquedule(idSubJob:number,idBranch:number){
    return this.http.delete(`${this.baseUrl}/jobs/schedule/delete/${idSubJob}/${idBranch}`);
  }

  addSquedule(data: any){
    return this.http.post(`${this.baseUrl}/jobs/newschedule`,data);
  }
  
}
