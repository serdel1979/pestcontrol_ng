import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Contact } from 'src/app/interfaces/contact.interface';
import { Router } from '@angular/router';


/* Ejemplo */

const ELEMENT_DATA: Contact[] = [
  {id: 1, name: 'Hydrogen', surname: 'H', email: 'hydrogen@example.com'},
  {id: 2, name: 'Helium', surname: 'He', email: 'helium@example.com'},
  {id: 3, name: 'Lithium', surname: 'Li', email: 'lithium@example.com'},
  {id: 4, name: 'Beryllium', surname: 'Be', email: 'beryllium@example.com'},
  {id: 5, name: 'Boron', surname: 'B', email: 'boron@example.com'},
  {id: 6, name: 'Carbon', surname: 'C', email: 'carbon@example.com'},
  {id: 7, name: 'Nitrogen', surname: 'N', email: 'nitrogen@example.com'},
  {id: 8, name: 'Oxygen', surname: 'O', email: 'oxygen@example.com'},
  {id: 9, name: 'Fluorine', surname: 'F', email: 'fluorine@example.com'},
  {id: 10, name: 'Neon', surname: 'Ne', email: 'neon@example.com'},
  {id: 11, name: 'Sodium', surname: 'Na', email: 'sodium@example.com'},
  {id: 12, name: 'Magnesium', surname: 'Mg', email: 'magnesium@example.com'},
  {id: 13, name: 'Aluminum', surname: 'Al', email: 'aluminum@example.com'},
  {id: 14, name: 'Silicon', surname: 'Si', email: 'silicon@example.com'},
  {id: 15, name: 'Phosphorus', surname: 'P', email: 'phosphorus@example.com'},
  {id: 16, name: 'Sulfur', surname: 'S', email: 'sulfur@example.com'},
  {id: 17, name: 'Chlorine', surname: 'Cl', email: 'chlorine@example.com'},
  {id: 18, name: 'Argon', surname: 'Ar', email: 'argon@example.com'},
  {id: 19, name: 'Potassium', surname: 'K', email: 'potassium@example.com'},
  {id: 20, name: 'Calcium', surname: 'Ca', email: 'calcium@example.com'},
];










@Component({
  selector: 'app-all-contacts',
  templateUrl: './all-contacts.component.html',
  styleUrls: ['./all-contacts.component.css']
})
export class AllContactsComponent implements AfterViewInit{

  public displayedColumns: string[] = ['id', 'name', 'surname', 'email'];
  public dataSource = new MatTableDataSource<Contact>(ELEMENT_DATA);

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private router: Router){}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  addContact(){
    this.router.navigateByUrl('contacts/addcontact');
  }

}
