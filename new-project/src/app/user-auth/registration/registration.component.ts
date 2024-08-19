import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { confirmPasswordValidator} from '../../../app/validators/confirm-password.validator'
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule,RouterModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit{
  
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router= inject(Router);
  dumbbell=faDumbbell
  check=faCircleCheck
  show=false
  isBlur=false
  registerForm !: FormGroup;
  gif=false

  ngOnInit(): void {
   this.registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    userName: ['', Validators.required],
    password: ['', Validators.required],
    ConfirmPassword: ['', Validators.required],
   },
   {
    validator: confirmPasswordValidator('password','ConfirmPassword')
   }
   );
   setTimeout(() => {
    if(this.show=true){
      this.show=false
      this.isBlur=false
    }
   }, 2000);
  }

  register(){
    this.gif=true
   this.authService.registerService(this.registerForm.value)
   .subscribe({
    next:(res)=>{
      this.registerForm.reset();
      this.isBlur=true
      this.show=true
      this.gif=false
      setTimeout(() => {
        this.router.navigate(['login'])
      }, 2000);
    },
    error:(err)=>{
      this.gif=false
    }
   })
  }
}
