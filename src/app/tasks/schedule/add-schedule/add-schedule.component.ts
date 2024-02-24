import { Component, OnInit, ViewChild } from '@angular/core';
import { TasksService } from '../../../services/tasks.service';
import { Job, SubJob } from 'src/app/interfaces/jobs.interface';
import { ClientService } from 'src/app/services/client.service';
import { Branch, Client } from 'src/app/interfaces/client.interface';
import { MatTabGroup } from '@angular/material/tabs';
import { Schedule } from 'src/app/interfaces/schedule.interface';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.css']
})
export class AddScheduleComponent implements OnInit {


  @ViewChild('tabGroup') tabGroup!: MatTabGroup;

  public sending: boolean = false;

  public jobs: Job[] = [];

  public clients: Client[] = [];

  public filteredClients: Client[] = [];

  public selectedClient: Client | undefined;

  public selectedBranch: Branch | undefined;

  public selectedJob: Job | undefined;

  public selecSubJob: SubJob | undefined;

  public description: string = "Sin descripción";

  public filteredJobs: Job[] = [];

  public startDate: Date | null = null;

  public endDate: Date | null = null;

  constructor(private tasksService: TasksService,
    public clientService: ClientService,
    private router: Router,
    private alertDialogService: AlertService) { }

  ngOnInit(): void {
    this.tasksService.getJobs().subscribe(resp => {
      this.jobs = resp;
      this.filteredJobs = this.jobs;
      this.clientService.getClients().subscribe(resp => {
        this.clients = resp;
        this.filteredClients = this.clients;
      })
    })
  }


  selectClient(client: Client): void {
    this.selectedClient = client;
  }

  selectBranch(branch: Branch): void {
    this.selectedBranch = branch;
  }

  selectJob(job: Job): void {
    this.selectedJob = job;
  }

  selectedSubJob(subJob: SubJob) {
  
    console.log(subJob.id);
    this.selecSubJob = subJob;
  }


  filterClients(event: any): void {
    const filterValue = event.target.value.toLowerCase();
    this.filteredClients = this.clients.filter(client => client.businessName.toLowerCase().includes(filterValue));
  }

  filterJobs(event: any): void {
    const filterValue = event.target.value.toLowerCase();
    this.filteredJobs = this.jobs.filter(job => job.description.toLowerCase().includes(filterValue));
  }


  changeTabTask(): void {
    this.tabGroup.selectedIndex = 1;
  }

  changeTabDateInit(): void {
    this.tabGroup.selectedIndex = 2;
  }

  changeTabDateEnd(): void {
    this.tabGroup.selectedIndex = 3;
  }



  save() {
    this.sending = true;
    const data = {
      branchId: this.selectedBranch?.id,
      subJobId: this.selecSubJob?.id,
      description: this.description,
      dateInit: this.startDate,
      dateEnd: this.endDate
    }
    this.tasksService.addSquedule(data).subscribe(
      res => {
        this.sending = false;
        this.back();
      },
      (err) => {
        this.sending = false;
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
