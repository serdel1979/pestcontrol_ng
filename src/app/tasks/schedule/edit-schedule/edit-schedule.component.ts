import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from '../../../services/tasks.service';
import { Schedule } from '../../../interfaces/schedule.interface';

@Component({
  selector: 'app-edit-schedule',
  templateUrl: './edit-schedule.component.html',
  styleUrls: ['./edit-schedule.component.css']
})
export class EditScheduleComponent implements OnInit{

  public id!: number;

  public loading: boolean = false;


  public schedule!: Schedule;




  constructor(private route: ActivatedRoute,
    private taskService: TasksService){}

  ngOnInit():void{
    this.id = this.route.snapshot.params['id'];
    this.loading = true;
    this.taskService.getSquedule(this.id)
    .subscribe(resp=>{
      this.schedule=resp;
      this.loading=false;
    },
    err=>{
      this.loading=false;
    })
  }


  save(){

  }


  back() {
    window.history.back();
  }


}
