import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthService } from '../../services/auth.service';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { AdminAccountsComponent } from '../admin-accounts/admin-accounts.component';

@Component({
  selector: 'app-admin-profile-info',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule,FormsModule,ReactiveFormsModule, MatNativeDateModule, MatIconModule,FontAwesomeModule,AdminAccountsComponent,MatDatepickerModule,MatInputModule,MatFormFieldModule],
  templateUrl: './admin-profile-info.component.html',
  styleUrl: './admin-profile-info.component.css'
})
export class AdminProfileInfoComponent {
  visible=false
  edit=faEdit
  user:any
  profileUpdate !:FormGroup
  constructor( private authService:AuthService , private fb:FormBuilder){}

  ngOnInit(): void{
    this.authService.getAdmin().subscribe((result)=>{
      this.user=result
    })

    this.profileUpdate=this.fb.group({
      firstName: ['', Validators.required,],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      dob: ['',Validators.required],
      gender:['', Validators.required],
      contactNumber:['',Validators.required]
    })
  } 

  change(){
    this.visible=!this.visible
  }

update(id:string){
  this.authService.updateUser(id,this.profileUpdate.value).subscribe((result)=>{
    alert ('User Updated')
    })
}

}
