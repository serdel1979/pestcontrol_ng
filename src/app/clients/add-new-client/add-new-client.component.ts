import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTabGroup } from '@angular/material/tabs';
import { AlertService } from 'src/app/services/alert.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-add-new-client',
  templateUrl: './add-new-client.component.html',
  styleUrls: ['./add-new-client.component.css']
})
export class AddNewClientComponent {

  @ViewChild('tabGroup') tabGroup!: MatTabGroup;

  public sending: boolean = false;

  public clientForm: FormGroup = this.fb.group({
    businessName: ['', Validators.required],
    cuit: ['', Validators.required],
  });

  public contactForm: FormGroup = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phones: this.fb.array([])
  })



  constructor(private fb: FormBuilder, private clients: ClientService, public dialog: MatDialog,
    private alertDialogService: AlertService) { }


    get phoneForms() {
      return this.contactForm.get('phones') as FormArray;
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
  



    onSubmit() {
      if (this.clientForm.valid) {
        this.tabGroup.selectedIndex = 1;
      }
    }

    submitContact(){
      if(this.contactForm.valid){
        this.tabGroup.selectedIndex = 2;
      }
    }

    back() {
      window.history.back();
    }

    save(){
      
    }


}
