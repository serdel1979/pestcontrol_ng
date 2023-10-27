import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-cli',
  templateUrl: './form-cli.component.html',
  styleUrls: ['./form-cli.component.css']
})
export class FormCliComponent {

  @Input() clientForm!: FormGroup;
  @Output() tabChangeRequest = new EventEmitter<number>();


  onSubmit() {
    if (this.clientForm.valid) {
      // Emitir un evento para solicitar un cambio de tab
      this.tabChangeRequest.emit(1);
    }
  }


}
