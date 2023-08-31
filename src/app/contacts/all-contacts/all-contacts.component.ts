import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Contact } from 'src/app/interfaces/contact.interface';
import { Router } from '@angular/router';


/* Ejemplo */

const ELEMENT_DATA: Contact[] = [];










@Component({
  selector: 'app-all-contacts',
  templateUrl: './all-contacts.component.html',
  styleUrls: ['./all-contacts.component.css']
})
export class AllContactsComponent implements AfterViewInit{

  public displayedColumns: string[] = ['id', 'name', 'surname', 'email','phones'];
  public dataSource = new MatTableDataSource<Contact>(ELEMENT_DATA);

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private router: Router){}

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
