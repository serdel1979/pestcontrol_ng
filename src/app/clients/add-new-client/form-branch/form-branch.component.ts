import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-branch',
  templateUrl: './form-branch.component.html',
  styleUrls: ['./form-branch.component.css']
})
export class FormBranchComponent {

  @Input() branchForm!: FormGroup;
  @Output() addBranch = new EventEmitter<void>();
  

  onSubmit() {
    if (this.branchForm.valid) {
      this.addBranch.emit(); // Emitir un evento para agregar la sucursal
    }
  }



}
