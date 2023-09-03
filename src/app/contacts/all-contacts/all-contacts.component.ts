import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Contact } from 'src/app/interfaces/contact.interface';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';


/* Ejemplo */









@Component({
  selector: 'app-all-contacts',
  templateUrl: './all-contacts.component.html',
  styleUrls: ['./all-contacts.component.css']
})
export class AllContactsComponent implements AfterViewInit, OnInit{

  public displayedColumns: string[] = ['name', 'surname', 'email'];
  public contacts : Contact[] = [];
  public contactsFilter : Contact[] = [];
  public filter!:string;
  public dataSource = new MatTableDataSource<Contact>(this.contactsFilter);

 
  public loading: boolean = false;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private router: Router, private clientServices: ClientService){}

  applyFilter() {
    if (this.filter.trim() === '') {
      this.contactsFilter = this.contacts;
    } else {
      const filterValue = this.filter.toLowerCase();
      this.contactsFilter = this.contacts.filter((contact: Contact) => {
        // Comprueba si el filtro coincide con el nombre, surname o email
        return (
          contact.name.toLowerCase().includes(filterValue) ||
          contact.surname.toLowerCase().includes(filterValue) ||
          contact.email.toLowerCase().includes(filterValue)
        );
      });
    }
    this.dataSource.data = this.contactsFilter;
  }
  

  ngOnInit(): void {
    this.loading = true;
    this.clientServices.getContacts()
    .subscribe(resp=>{
      this.contacts = resp;
      this.contactsFilter = resp;
      this.dataSource.data = this.contactsFilter;
      this.loading = false;
    },
    err=>{
      this.loading = false;
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  addContact(){
    this.router.navigateByUrl('contacts/addcontact');
  }

  back() {
    window.history.back();
  }

}
