import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  public contactForm!: FormGroup;
  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phones: this.fb.array([])
    });
    this.subscribeToInputChanges();
  }


  private subscribeToInputChanges() {
    const inputFields = ['name', 'surname', 'email'];
  
    inputFields.forEach(fieldName => {
      const control = this.contactForm.get(fieldName);
  
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
  



  get phoneControls() {
    return this.contactForm.get('phones') as FormArray;
  }


  back() {
    window.history.back();
  }

  addPhone() {
    const phoneGroup = this.fb.group({
      number: ['', Validators.required]
    });
    this.phoneControls.push(phoneGroup);
  }

  removePhone(index: number) {
    this.phoneControls.removeAt(index);
  }

  saveContact() {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
    }
  }


}
