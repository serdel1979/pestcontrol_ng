import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contact } from 'src/app/interfaces/contact.interface';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public contact: Contact) {}
}
