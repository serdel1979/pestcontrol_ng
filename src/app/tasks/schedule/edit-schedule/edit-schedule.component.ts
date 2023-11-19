import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from '../../../services/tasks.service';
import { Schedule } from '../../../interfaces/schedule.interface';
import { AlertService } from 'src/app/services/alert.service';

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
    private taskService: TasksService,
    private alertDialogService: AlertService){}

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


  save() {
    this.loading = true;
    const data = {
      branchId: this.schedule.branch.id,
      subJobId: this.schedule.subJob.id,
      description: this.schedule.description,
      dateInit: this.schedule.dateInit,
      dateEnd: this.schedule.dateEnd
    }
    this.taskService.editSquedule(this.id,data).subscribe(
      res => {
        this.loading = false;
        this.back();
      },
      (err) => {
        this.loading = false;
        if (err.status == 400) {
          this.alertDialogService.openAlertDialog(err.error);
        } else {
          this.alertDialogService.openAlertDialog("Error desconocido");
        }
      }
    )
  }


  back() {
    window.history.back();
  }



}
