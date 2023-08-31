import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contact } from 'src/app/interfaces/contact.interface';

@Component({
  selector: 'app-see-detail',
  templateUrl: './see-detail.component.html',
  styleUrls: ['./see-detail.component.css']
})
export class SeeDetailComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public contact: Contact) {}
}
