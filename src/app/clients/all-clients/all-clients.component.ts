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
export class AllClientsComponent implements OnInit {
  public clients: Client[] = [];
  public load: boolean = false;
  pageSize: number = 5;
  currentPage: number = 1;
  pageSizeOptions: number[] = [5, 10, 25];

  public displayedColumns: string[] = ['businessName', 'cuit', 'contact', 'actions', 'branchs'];
  public dataSource = new MatTableDataSource<Client>(); // Inicializa el dataSource vacío

  //@ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
@ViewChild(MatPaginator) set paginator(paginator: MatPaginator) {
        this.dataSource.paginator = paginator;
}


  constructor(private router: Router,
    private clientService: ClientService,
    private dialog: MatDialog) {
    this.load = true;
    this.clientService.getClients().subscribe(resp => {
      this.clients = resp;
      this.dataSource = new MatTableDataSource<Client>(this.clients); // Actualiza el dataSource con los datos
      this.dataSource.paginator = this.paginator; // Configura el paginador
      this.load = false;
    },
      () => {
        this.load = false;
      });
  }

  ngOnInit(): void {
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    console.log(this.currentPage, this.pageSize);
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  addClient() {
    this.router.navigateByUrl('clients/addclient');
  }

  newBranch(id: number, businessName: string) {
    this.router.navigateByUrl(`clients/${id}/newbranch/${businessName}`);
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
