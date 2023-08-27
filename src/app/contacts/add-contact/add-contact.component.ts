import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  }

  get phoneControls() {
    return this.contactForm.get('phones') as FormArray;
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
