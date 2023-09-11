import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';
import { AddNoveltieComponent } from '../add-noveltie/add-noveltie.component';

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
    private dialog: MatDialog){}


  ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
      this.loading = true;
      this.tasksService.getSubTask(this.id)
      .subscribe(resp=>{
        this.loading = false;
        this.subtask = resp;
      },
      ()=>this.loading = false)
  }

  addNoveltie(id: number): MatDialogRef<AddNoveltieComponent> {
    return this.dialog.open(AddNoveltieComponent, {
      width: '500px',
      data: { id }
    });
  }
  

  // addNoveltie(id: number){
  //   this.dialog.open(AddNoveltieComponent, {
  //     width: '500px',
  //     data: {id}
  //   });
  // }

  openNoveltieDialog(id: number): void {
    const dialogRef = this.addNoveltie(id);
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('actualizar');
      this.loading = true;
      this.tasksService.getSubTask(this.id)
        .subscribe(resp => {
          this.loading = false;
          this.subtask = resp;
        }, () => this.loading = false);
    });
  }
  

  back() {
    window.history.back();
  }
}
