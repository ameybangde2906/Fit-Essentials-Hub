import { Component, OnInit,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder,FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent implements OnInit {
  forgetForm !:FormGroup;
  fb = inject(FormBuilder);
  authService =inject(AuthService)
  dumbbell=faDumbbell

  ngOnInit(): void {
    this.forgetForm=this.fb.group({
      email:['',Validators.compose([Validators.required, Validators.email])]
    })
  }
  submit(){
    this.authService.loginService(this.forgetForm.value)
    .subscribe({
      next:(res)=>{
        this.forgetForm.reset();
      },
      error:(err)=>{
        
      }
    })
  }
}
