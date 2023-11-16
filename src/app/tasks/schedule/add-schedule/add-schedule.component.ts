import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../../services/tasks.service';
import { Job } from 'src/app/interfaces/jobs.interface';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.css']
})
export class AddScheduleComponent implements OnInit{

  public sending: boolean = false;

  public jobs: Job[] = [];

  constructor(private tasksService: TasksService){}
  
  ngOnInit(): void {
    this.tasksService.getJobs().subscribe(resp=>{
      console.log(resp);
      this.jobs = resp;
    })
  }



  save(){

  }

  back() {
    window.history.back();
  }

}
