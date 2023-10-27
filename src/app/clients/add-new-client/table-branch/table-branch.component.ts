import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table-branch',
  templateUrl: './table-branch.component.html',
  styleUrls: ['./table-branch.component.css']
})
export class TableBranchComponent {
  
  @Output() deleteBranchClicked = new EventEmitter<any>();
  @Input() dataSource!: MatTableDataSource<any>;

  displayedColumns: string[] = ['name', 'street', 'number', 'floor', 'zipcode', 'apartment', 'city', 'action'];

  


}
