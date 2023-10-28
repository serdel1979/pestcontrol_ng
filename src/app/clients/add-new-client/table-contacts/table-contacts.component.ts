import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table-contacts',
  templateUrl: './table-contacts.component.html',
  styleUrls: ['./table-contacts.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableContactsComponent {


  @Input() dataSourceContact = new MatTableDataSource<any>();
  @Output() deleteContactClicked = new EventEmitter<any>();

  displayedColumnsContact: string[] = ['name', 'surname', 'email', 'branch', 'action'];
  columnsToDisplayWithExpand = [...this.displayedColumnsContact, 'expand'];
  expandedElement: any | null;


}