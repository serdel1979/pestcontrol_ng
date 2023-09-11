import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';
import { AddNoveltieComponent } from '../add-noveltie/add-noveltie.component';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'app-sub-task-detail',
  templateUrl: './sub-task-detail.component.html',
  styleUrls: ['./sub-task-detail.component.css']
})
export class SubTaskDetailComponent {
  public loading: boolean = false;
  public subtask: any;
  public id!: number;



  constructor(private tasksService:  TasksService,
    private route: ActivatedRoute,
    private shared: SharedDataService,
    private dialog: MatDialog){}


  ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
      this.loadData();
      this.shared.subtask$.subscribe((updated) => {
        this.loadData();
      });
  }


  loadData(){
    this.loading = true;
    this.tasksService.getSubTask(this.id)
    .subscribe(resp=>{
      this.loading = false;
      this.subtask = resp;
    },
    ()=>this.loading = false)
  }

  addNoveltie(id: number){
    this.dialog.open(AddNoveltieComponent, {
      width: '500px',
      data: {id}
    });
  }




  

  back() {
    window.history.back();
  }
}
