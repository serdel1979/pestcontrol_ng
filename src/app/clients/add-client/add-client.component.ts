import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from 'src/app/interfaces/client.interface';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit{

  public clientForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      businessName: ['', Validators.required],
      cuit: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phones: this.fb.array([])
    });
  }

  get phoneControls() {
    return this.clientForm.get('phones') as FormArray;
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
    if (this.clientForm.valid) {
      // const client = {
      //   businessName: this.clientForm.get('businessName')?.value,
      //   cuit: this.clientForm.get('cuit')?.value,
      //   contact: {
      //     name: this.clientForm.get('name')?.value,
      //     surname: this.clientForm.get('surname')?.value,
      //     email: this.clientForm.get('email')?.value,
      //   },
      //   phones: this.clientForm.get('phones')?.value
      // };
      // console.log(client);
      console.log(this.clientForm.value);
    }
  }



}


