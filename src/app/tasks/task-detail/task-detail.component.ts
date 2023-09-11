import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TasksService } from '../../services/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {

  public loading: boolean = false;
  public task: any;
  public id!: number;



  constructor(private tasksService:  TasksService,
    private route: ActivatedRoute, private router: Router){}


  ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
      this.loading = true;
      this.tasksService.getTask(this.id)
      .subscribe(resp=>{
        this.loading = false;
        this.task = resp;
      },
      ()=>this.loading = false)
  }

  subJob(id: number){
    this.router.navigateByUrl(`/tasks/subtask/${id}`);
  }

  back() {
    window.history.back();
  }
}
