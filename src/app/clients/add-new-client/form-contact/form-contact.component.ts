import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-contact',
  templateUrl: './form-contact.component.html',
  styleUrls: ['./form-contact.component.css']
})
export class FormContactComponent {

  @Input() contactForm!: FormGroup;
  @Input() branches!: any[];
  
  @Output() selectedBranch = new EventEmitter<any>();
  @Output() formValidityChanged = new EventEmitter<boolean>();




  onSelectedBranch(branch: any) {
    this.selectedBranch.emit(branch);
  }



  
}
