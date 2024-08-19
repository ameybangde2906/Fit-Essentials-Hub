import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccountsComponent } from '../accounts/accounts.component';
import { AuthService } from '../../services/auth.service';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';


@Component({
  selector: 'app-profile-info',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule,FormsModule,FormsModule,ReactiveFormsModule, MatNativeDateModule, MatIconModule,FontAwesomeModule,AccountsComponent,MatDatepickerModule,MatInputModule,MatFormFieldModule],
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.css'
})
export class ProfileInfoComponent {

  visible=false
  edit=faEdit
  user:any
  profileUpdate !:FormGroup
  constructor( private authService:AuthService , private fb:FormBuilder){}

  ngOnInit(): void{
    this.authService.getUser().subscribe((result)=>{
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
    })
}


}
