import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Client } from 'src/app/interfaces/client.interface';

@Component({
  selector: 'app-all-clients',
  templateUrl: './all-clients.component.html',
  styleUrls: ['./all-clients.component.css']
})
export class AllClientsComponent {

  public clients: Client[] = []

  public displayedColumns: string[] = ['Empresa', 'Cuit', 'Contacto'];
  public dataSource = new MatTableDataSource<Client>(this.clients);

  constructor(private router: Router){}

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;



  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  addClient(){
    //this.router.navigateByUrl('contacts/addcontact');
  }


}
