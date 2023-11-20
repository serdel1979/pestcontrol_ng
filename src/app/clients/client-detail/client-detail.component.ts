import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientGet } from 'src/app/interfaces/client-get.interface';
import { AlertService } from 'src/app/services/alert.service';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit{

  public id!: number;
  public loading: boolean = false;

  public client!: ClientGet;

  constructor(private route: ActivatedRoute,
    private alertDialogService: AlertService,
    private clientService: ClientService){}


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.loading = true;
    this.clientService.getClient(this.id)
    .subscribe(resp=>{
      this.client=resp;
      this.loading=false;
    },
    err=>{
      this.loading=false;
    })
  }





  back() {
    window.history.back();
  }
}
