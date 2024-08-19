import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { product } from '../../data-type';
import { CartService } from '../../services/cart.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FontAwesomeModule, MatFormFieldModule, MatInputModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  loginForm !: FormGroup;
  dumbbell=faDumbbell
  show=false
  check=faCircleCheck
  popup=false
  isBlur=false
  gif=false

  constructor(private product: CartService) { }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    },
    );
    setTimeout(() => {
      if(this.popup=true){
        this.popup=false
        this.isBlur=false
      }
     }, 2000);
  }

  login() {
    this.gif=true
    this.authService.loginService(this.loginForm.value)
      .subscribe({
        next: (res) => {
          localStorage.setItem('user_id', JSON.stringify(res.data));
          this.loginForm.reset();
          this.localCartToRemoteCart()
          this.isBlur=true
          this.popup=true
          this.gif=false
          setTimeout(() => {
            this.router.navigate(['']);
          }, 2000);
        },
        error: (err) => {
          this.show=true
          this.gif=false
          this.loginForm.reset()
        }
      })
  }
  
  localCartToRemoteCart() {
    let data = localStorage.getItem('cartProducts');
    let user = localStorage.getItem('user_id');
    let userId = user && JSON.parse(user)._id;

    if (data) {
      let cartDataList = JSON.parse(data);
      cartDataList.forEach((product: product, index: number) => {
        let cartData: any = {
          ...product,
          productId: product._id,
          userId,
          quantiy: undefined
        };
        delete cartData._id;
        this.product.addToCart(cartData).subscribe((result) => {
          if (result) {
            console.log("item stored in db");
          }
        })
        if (cartDataList.length === index + 1) {
          localStorage.removeItem("cartProducts")
        }
      })
    }
    this.product.getCartList(userId)
  }
}

