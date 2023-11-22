import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { TasksService } from '../../services/tasks.service';
import { JobType } from 'src/app/interfaces/jobs.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-setting-tasks',
  templateUrl: './setting-tasks.component.html',
  styleUrls: ['./setting-tasks.component.css']
})
export class SettingTasksComponent implements OnInit {


  public typeJobs: JobType[]=[];

  public loading: boolean = false;

  public newJobType: string = '';

  constructor(private taskServices: TasksService, private _snackBar: MatSnackBar){}

  ngOnInit(): void {
   this.loadData();
  }

  loadData(){
    this.loading = true;
    this.taskServices.getTypeTasks()
    .subscribe(resp=>{
      this.typeJobs = resp;
      this.loading = false;
    },
    err=>{
      this.loading = false;
    })
  }


  @ViewChild('tabGroup') tabGroup!: MatTabGroup;




  onEnter(): void {
    const trimmedDescription = this.newJobType.trim();

    if (trimmedDescription !== '' && !this.typeJobs.some(jobType => jobType.description === trimmedDescription)) {
      const jobType: JobType = {
        id: 0,
        description: trimmedDescription
      };

      this.typeJobs.push(jobType);
      this.typeJobs.sort((a, b) => a.description.localeCompare(b.description));
      this.newJobType = ''; 
    }
  }

  saveTypes(){
    this.loading=true;
    this.taskServices.saveTypes(this.typeJobs)
    .subscribe(resp=>{
      this.loading = false;
      this._snackBar.open("Tipos guardados", "OK");
      this.loadData();
    },
    err=>{
      this.loading = false;
    })
  }


  changeTabTask(): void {
    this.tabGroup.selectedIndex = 1;
  }

  changeTabSubTask(): void {
    this.tabGroup.selectedIndex = 2;
  }


  back() {
    window.history.back();
  }

}
