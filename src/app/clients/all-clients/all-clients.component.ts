import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Client } from 'src/app/interfaces/client.interface';
import { ClientService } from '../../services/client.service';
import { MatDialog } from '@angular/material/dialog';
import { SeeDetailComponent } from '../see-detail/see-detail.component';
import { Contact } from 'src/app/interfaces/contact.interface';

@Component({
  selector: 'app-all-clients',
  templateUrl: './all-clients.component.html',
  styleUrls: ['./all-clients.component.css']
})
export class AllClientsComponent implements OnInit{

  public clients: Client[] = []

  public load: boolean = false;

  public displayedColumns: string[] = ['businessName', 'cuit', 'contact','actions'];
  public dataSource = new MatTableDataSource<Client>(this.clients);

  constructor(private router: Router, 
              private clientService: ClientService, 
              private dialog: MatDialog){}

  ngOnInit(): void {
    this.load = true;
    this.clientService.getClients().subscribe(resp => {
      this.clients = resp;
      this.dataSource.data = this.clients; 
      this.load = false;
    },
    ()=>{
      this.load = false;
    });
  }  

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;



  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  addClient(){
    this.router.navigateByUrl('clients/addclient');
  }

  showDetails(contact: Contact) {
    this.dialog.open(SeeDetailComponent, {
      width: '400px',
      data: contact
    });
  }

  back() {
    window.history.back();
  }


}
