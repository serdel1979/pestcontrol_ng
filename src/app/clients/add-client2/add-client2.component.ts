import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { Client } from 'src/app/interfaces/client.interface';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-add-client2',
  templateUrl: './add-client2.component.html',
  styleUrls: ['./add-client2.component.css']
})
export class AddClient2Component {

  public clientForm!: FormGroup;

  constructor(private fb: FormBuilder, private clients: ClientService){}

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
    this.subscribeToInputChanges();
  }


  private subscribeToInputChanges() {
    const inputFields = ['businessName', 'cuit', 'contact.name', 'contact.surname'];
  
    inputFields.forEach(fieldName => {
      const control = this.clientForm.get(fieldName);
  
      if (control) {
        control.valueChanges.pipe(
          debounceTime(200)
        ).subscribe(newValue => {
          const uppercaseValue = newValue.toUpperCase();
          if (uppercaseValue !== control.value) {
            control.setValue(uppercaseValue, { emitEvent: false });
          }
        });
      }
    });
  }
  

  back() {
    window.history.back();
  }

  onSubmit() {
    console.log(this.clientForm.value);
    if (this.clientForm.valid) {
      this.clients.newClient(this.clientForm.value)
      .subscribe(resp=>{
        console.log(resp);
      },
      err=>{
        console.log(err);
      })
    }
  }

}
