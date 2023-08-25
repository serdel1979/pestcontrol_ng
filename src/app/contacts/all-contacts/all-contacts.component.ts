import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Contact } from 'src/app/interfaces/contact.interface';


/* Ejemplo */

const ELEMENT_DATA: Contact[] = [
  {id: 1, name: 'Hydrogen', email: 'hydrogen@example.com', surname: 'H'},
  {id: 2, name: 'Helium', email: 'helium@example.com', surname: 'He'},
  {id: 3, name: 'Lithium', email: 'lithium@example.com', surname: 'Li'},
  {id: 4, name: 'Beryllium', email: 'beryllium@example.com', surname: 'Be'},
  {id: 5, name: 'Boron', email: 'boron@example.com', surname: 'B'},
  {id: 6, name: 'Carbon', email: 'carbon@example.com', surname: 'C'},
  {id: 7, name: 'Nitrogen', email: 'nitrogen@example.com', surname: 'N'},
  {id: 8, name: 'Oxygen', email: 'oxygen@example.com', surname: 'O'},
  {id: 9, name: 'Fluorine', email: 'fluorine@example.com', surname: 'F'},
  {id: 10, name: 'Neon', email: 'neon@example.com', surname: 'Ne'},
  {id: 11, name: 'Sodium', email: 'sodium@example.com', surname: 'Na'},
  {id: 12, name: 'Magnesium', email: 'magnesium@example.com', surname: 'Mg'},
  {id: 13, name: 'Aluminum', email: 'aluminum@example.com', surname: 'Al'},
  {id: 14, name: 'Silicon', email: 'silicon@example.com', surname: 'Si'},
  {id: 15, name: 'Phosphorus', email: 'phosphorus@example.com', surname: 'P'},
  {id: 16, name: 'Sulfur', email: 'sulfur@example.com', surname: 'S'},
  {id: 17, name: 'Chlorine', email: 'chlorine@example.com', surname: 'Cl'},
  {id: 18, name: 'Argon', email: 'argon@example.com', surname: 'Ar'},
  {id: 19, name: 'Potassium', email: 'potassium@example.com', surname: 'K'},
  {id: 20, name: 'Calcium', email: 'calcium@example.com', surname: 'Ca'},
];










@Component({
  selector: 'app-all-contacts',
  templateUrl: './all-contacts.component.html',
  styleUrls: ['./all-contacts.component.css']
})
export class AllContactsComponent implements AfterViewInit{

  displayedColumns: string[] = ['Nombre', 'Apellido', 'Email', 'Acción'];
  dataSource = new MatTableDataSource<Contact>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
