import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { TasksService } from '../../services/tasks.service';
import { Job, JobType, SubJob } from 'src/app/interfaces/jobs.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-setting-tasks',
  templateUrl: './setting-tasks.component.html',
  styleUrls: ['./setting-tasks.component.css']
})
export class SettingTasksComponent implements OnInit {


  public typeJobs: JobType[]=[];

  public listJobs: Job[] = [];

  public loading: boolean = false;

  public newJobType: string = '';

  public newJob: string = '';

  public typeSelected!: JobType;

  public jobSelected!: Job;

  public newSubJob!: string;


  constructor(private taskServices: TasksService, private _snackBar: MatSnackBar,
    private alertDialogService: AlertService){}

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
    });
    this.loading = true;
    this.taskServices.getJobs()
    .subscribe(resp=>{
      this.listJobs = resp;
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

  onEnterSubJob(){
    if(this.jobSelected){
      const trimmedDescription = this.newSubJob.trim();

      if (trimmedDescription !== '' && !this.jobSelected.subJobs.some(subj => subj.description === trimmedDescription)) {
        const subjobNew: SubJob = {
          id: 0,
          description: trimmedDescription
        };
  
        this.jobSelected.subJobs.push(subjobNew);
        this.jobSelected.subJobs.sort((a, b) => a.description.localeCompare(b.description));
        this.newSubJob = ''; 
      }
    }
  }


  onEnterJob(){
    const trimmedDescription = this.newJob.trim();

    if (trimmedDescription !== '' && !this.listJobs.some(job => job.description === trimmedDescription)) {
      const jobNew: Job = {
        id: 0,
        jobType: { id: 0, description: ''},
        subJobs: [],
        description: trimmedDescription
      };

      this.listJobs.push(jobNew);
      this.listJobs.sort((a, b) => a.description.localeCompare(b.description));
      this.newJob = ''; 
    }
  }
  
  addJobType(){
    const trimmedDescription = this.newJob.trim();

    if (trimmedDescription !== '' && !this.listJobs.some(job => job.description === trimmedDescription)) {
      const jobNew: Job = {
        id: 0,
        jobType: this.typeSelected,
        subJobs: [],
        description: trimmedDescription
      };

      this.listJobs.push(jobNew);
      this.listJobs.sort((a, b) => a.description.localeCompare(b.description));
      this.newJob = ''; 
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
      console.log(err);
      if (err.status === 400) {
        this.alertDialogService.openAlertDialog('Error al guardar');
      } else {
        // Otro tipo de error (error de red u otro)
        this.alertDialogService.openAlertDialog('Se ha producido un error. Por favor, inténtalo de nuevo más tarde.');
      }
    })
  }

  saveJobsSubJobs(){
    console.log(this.listJobs);
    this.loading=true;
    this.taskServices.saveJobs(this.listJobs)
    .subscribe(resp=>{
      this.loading=false;
      this._snackBar.open("Tareas y subtareas guardadas", "OK");
      this.loadData();
    },
    err=>{
      this.loading=false;
      console.log(err);
      if (err.status === 400) {
        this.alertDialogService.openAlertDialog('Error al guardar');
      } else {
        // Otro tipo de error (error de red u otro)
        this.alertDialogService.openAlertDialog('Se ha producido un error. Por favor, inténtalo de nuevo más tarde.');
      }
    })
  }


  delType(id:number){
    console.log(id);
  }

  delJob(id:number){
    console.log(id);
  }

  delSubJob(id:number){
    console.log(id);
  }

  changeTabTask(): void {
    this.tabGroup.selectedIndex = 1;
  }

  changeTabSubTask(): void {
    this.tabGroup.selectedIndex = 2;
  }

  selectJob(job: Job){
    this.jobSelected = job;
  }

  selectJobType(jobType: JobType){
    this.typeSelected = jobType;
  }


  back() {
    window.history.back();
  }

}
