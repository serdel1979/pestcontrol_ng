import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { Client } from 'src/app/interfaces/client.interface';

@Component({
  selector: 'app-add-client2',
  templateUrl: './add-client2.component.html',
  styleUrls: ['./add-client2.component.css']
})
export class AddClient2Component {

  clientForm: FormGroup;

  constructor(private fb: FormBuilder){
    this.clientForm = this.fb.group({
      businessName: ['', Validators.required],
      cuit: ['', Validators.required],
      contact: this.fb.group({
        name: ['', Validators.required],
        surname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phones: this.fb.array([]) 
      }),
    });
  }

  get phoneForms() {
    return this.clientForm.get('contact.phones') as FormArray;
  }

  addPhone() {
    const phoneFormGroup = this.fb.group({
      number: ['', Validators.required]
    });
    this.phoneForms.push(phoneFormGroup);
  }

  removePhone(index: number) {
    this.phoneForms.removeAt(index);
  }

  ngOnInit(): void {
    this.subscribeToInputChanges();
  }


  private subscribeToInputChanges() {
    const inputFields = ['businesName', 'cuit', 'name', 'surname']; // Add more fields if needed

    inputFields.forEach(fieldName => {
      const control = this.clientForm.get(fieldName);

      control?.valueChanges.pipe(
        debounceTime(300)
      ).subscribe(newValue => {
        const uppercaseValue = newValue.toUpperCase();
        if (uppercaseValue !== control.value) {
          control.setValue(uppercaseValue, { emitEvent: false });
        }
      });
    });
  }

  onSubmit() {
    if (this.clientForm.valid) {
      const client: Client = this.clientForm.value;
      console.log(client); // Puedes hacer lo que quieras con el objeto client aquí
    }
  }

}
