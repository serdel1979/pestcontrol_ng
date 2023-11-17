import { Component, OnInit, ViewChild } from '@angular/core';
import { TasksService } from '../../../services/tasks.service';
import { Job } from 'src/app/interfaces/jobs.interface';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/interfaces/client.interface';
import { MatTabGroup } from '@angular/material/tabs';

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

  public selectedJob: Job | undefined;


  public filteredJobs: Job[] = [];

  public startDate: Date | null = null;
  
  public endDate: Date | null = null;

  constructor(private tasksService: TasksService,
    public clientService: ClientService) { }

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

  selectJob(job: Job): void {
    this.selectedJob = job;
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

  }

  back() {
    window.history.back();
  }

}
