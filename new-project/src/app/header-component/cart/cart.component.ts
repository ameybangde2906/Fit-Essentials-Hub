import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../../services/cart.service';
import { cart, priceSummary, product } from '../../data-type';
import { RouterModule, Router } from '@angular/router';
import { LocalCartService } from '../../services/local-cart.service';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faIndianRupee } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { RemoveProductDialogComponent } from './remove-product-dialog/remove-product-dialog.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule, ReactiveFormsModule, FormsModule, MatDialogModule, MatButtonModule,],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  rupee = faIndianRupee
  heart = faHeart

  faTrash = faTrash
  router = inject(Router)

  updateForm!: FormGroup
  fb = inject(FormBuilder);

  free: any;
  notFree: any;

  show: any;
  hide: any;

  cartData: any[] | undefined;

  see: any;
  dontsee=false

  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0,
  }

  cartProducts: any[] = [];
  totalCost: number = 0;
  deliveryCost: number = 0;
  overAllCost: number = 0;
  taxCost: number = 0;
  discountCost: number = 0;

  constructor(private product: CartService, private localCart: LocalCartService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getproducts()
    this.getCartData();
    this.calculateTotalCost();
  }

  getproducts() {
    this.product.currentCart().subscribe((result) => {
      this.cartData = result;
      if (!this.cartData.length) {
        this.show = true
        this.hide = false
      }
      else {
        this.show = false
        this.hide = true
      }
      let price = 0;
      result.forEach((item) => {
        if (item.quantity && item.productDiscount) {
          price = Math.round(price + ((+item.productCost - item.productCost * item.productDiscount / 100) * item.quantity));
        }
        else if (item.quantity) {
          price = Math.round(price + (item.productCost * item.quantity))
        }


        if (price > 500) {
          this.free = true
          this.notFree = false
          this.priceSummary.delivery = 0
        }
        else {
          this.free = false
          this.notFree = true
          this.priceSummary.delivery = 500
        }
      });
      this.priceSummary.price = price;
      this.priceSummary.discount = Math.round(price * 10 / 100);
      this.priceSummary.total = Math.round(price - (price * 10 / 100) + this.priceSummary.delivery)
      console.log(this.priceSummary)
    })
    

    this.cartData = this.localCart.getCart()
    let userData = localStorage.getItem("user_id")
    if (!this.cartData?.length && !userData) {
      this.dontsee = true
      this.see = false
    }
    else if (userData) {
      this.dontsee = false;
      this.see = false
    }
    else {
      this.dontsee = false
      this.see = true
    }

  }


  getCartData() {
    const cartData = localStorage.getItem('cartProducts');
    if (cartData) {
      this.cartProducts = JSON.parse(cartData)
    }
  }

  calculateTotalCost() {
    this.totalCost = this.cartProducts.reduce((total, product) => {
      if (product.productDiscount) {
        return total + ((product.productCost - product.productCost * product.productDiscount / 100) * product.quantity)

      }
      else {
        return total + (product.productCost * product.quantity)
      }

    }, 0)

    this.discountCost = Math.round(this.totalCost * 10 / 100)

    this.cartData = this.localCart.getCart()
    let userData = localStorage.getItem("user_id")

    if (this.totalCost > 500) {
      this.free = true
      this.deliveryCost = 0
    }
    
    else if(!this.cartProducts.length && !userData){
      this.dontsee=true
      this.see=false
    }
    else{
      this.free = false
      this.notFree = true
      this.deliveryCost = 500
    }

    this.overAllCost = this.totalCost + this.deliveryCost - this.discountCost
    this.localCart.getCart()
  }

  openDialog(item: string) {
    this.dialog.open(RemoveProductDialogComponent, {
      width: '280px',
      data: item
    }).afterClosed().subscribe(val => {
      if (val === 'delete' || val === 'wishlist') {
        this.getproducts()

        let userStore = localStorage.getItem('user_id');
        let userData = userStore && JSON.parse(userStore);
        this.product.getCartList(userData._id)
      }
    })
  }

  deleteItem(itemId: string) {
    this.localCart.removeItemFromCart(itemId);
    this.cartProducts = this.localCart.getCart();
    this.getCartData()
    this.calculateTotalCost()
  }

  checkout() {
    this.router.navigate(["address"])
  }

  proceed() {
    this.router.navigate(["login"])
  }


  incrementQuantity(itemId: string, quantity: number): void {
    this.product.incrementQuantity(itemId).subscribe(item => {
      console.log('Incremented item:', item);
      this.getproducts()

      // Optionally, update local state or UI here
    });
  }

  decrementQuantity(itemId: string, quantity: number): void {
    this.product.decrementQuantity(itemId).subscribe(item => {
      console.log('Decremented item:', item);
      this.getproducts()

      // Optionally, update local state or UI here
    });
  }


  inc(index: number) {
    this.localCart.increment(index);
    this.cartProducts = this.localCart.getCart()
    this.calculateTotalCost()
  }


  dec(index: number) {
    this.localCart.decrement(index);
    this.cartProducts = this.localCart.getCart()
    this.calculateTotalCost()
  }

}




