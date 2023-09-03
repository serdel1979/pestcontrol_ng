import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.css']
})
export class AddBranchComponent implements OnInit {

  public branchForm!: FormGroup;
  public idClient!: number;
  public businessName!: string;

  constructor(private fb: FormBuilder,private route: ActivatedRoute){}


  ngOnInit(): void {
    this.idClient = this.route.snapshot.params['id'];
    this.businessName = this.route.snapshot.params['clientname'];
    this.branchForm = this.fb.group({
      clientId: ['', Validators.required],
      name: ['', Validators.required],
      address: this.fb.group({
        street: ['', Validators.required],
        number: ['', Validators.required],
        floor: ['', [Validators.required, Validators.email]],
        zipcode: ['', Validators.required],
        apartment:['',Validators.required],
        city:['', Validators.required]
      }),
    });
  }

  onSubmit(id:number){
    this.branchForm.get('clientId')?.setValue(id);
  }

  back(){
    window.history.back();
  }
}
