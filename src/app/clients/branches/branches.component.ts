import { Component,Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from 'src/app/interfaces/client.interface';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent implements OnInit{
  constructor(@Inject(MAT_DIALOG_DATA) public client: Client, private clientsService: ClientService) {}


  public branches: any[] = [];


  ngOnInit(): void {
    if(this.client.id){
      this.clientsService.getBranches(this.client.id)
      .subscribe((resp)=>{
        this.branches = resp;
        console.log(this.branches);
      })
    }
  }






}
