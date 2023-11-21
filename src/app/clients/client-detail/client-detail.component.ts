import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientGet } from 'src/app/interfaces/client-get.interface';
import { AlertService } from 'src/app/services/alert.service';
import { ClientService } from '../../services/client.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogCancelComponent } from 'src/app/alerts/dialog-cancel/dialog-cancel.component';
import { Branch } from 'src/app/interfaces/client.interface';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit{

  public id!: number;
  public loading: boolean = false;

  public client!: ClientGet;

  public dataSource = new MatTableDataSource<any>();
  public dataSourceContacts = new MatTableDataSource<any>();

  public branchSelected: string = "...";

  constructor(private route: ActivatedRoute,
    private alertDialogService: AlertService,
    private clientService: ClientService,
    private dialog: MatDialog){}


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.loadData();
  }

  loadData(){
    this.loading = true;
    this.clientService.getClient(this.id)
    .subscribe(resp=>{
      this.client=resp;
      this.dataSource.data=this.client.branches;
      this.loading=false;
    },
    err=>{
      this.loading=false;
    })
  }



  selectBranch(element:any){
    this.branchSelected = element.name;
    this.dataSourceContacts.data = element.contacts;
  }

  deletContact(element:any){
    return new Promise<boolean>((resolve) => {
      const dialogRef = this.dialog.open(DialogCancelComponent, {
        data: { message: '¿Está seguro de eliminar el contacto?' },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.loading = true;
          console.log('elimina sucursal ', element);
          this.loading = false;
        }
      });
    });
  }


  deletBranch(element: any) {
    return new Promise<boolean>((resolve) => {
      const dialogRef = this.dialog.open(DialogCancelComponent, {
        data: { message: '¿Está seguro de eliminar sucursal?' },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.loading = true;
          console.log('elimina sucursal ', element);
          this.loading = false;
        }
      });
    });
    
  }


  back() {
    window.history.back();
  }
}
