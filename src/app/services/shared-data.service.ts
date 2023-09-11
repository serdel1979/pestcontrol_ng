import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() { }


  private subtaskSubject = new BehaviorSubject<any>(null);
  subtask$ = this.subtaskSubject.asObservable();

  updateSubtask(subtask: boolean) {
    console.log(subtask);
    this.subtaskSubject.next(subtask);
  }



}
