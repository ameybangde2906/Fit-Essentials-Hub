import { Component, Input, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressComponent } from '../address/address.component';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';
import { priceSummary } from '../data-type';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule,AddressComponent,FormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {

  router=inject(Router)
  cartData:any
  value:string='';
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0,
  }

  popup=false

  constructor(private cartService: CartService, private orderService:OrderService){}
  @Input() item:any

  radioChecked: boolean = false;

  ngOnInit(){
    setTimeout(() => {
      if(this.popup=true){
        this.popup=false
      }
     }, 4000);
     
    return this.cartService.currentCart().subscribe((result)=>{
      this.cartData=result

      let price = 0;
      result.forEach((item) => {
      
        if (item.quantity && item.productDiscount) {
          price = price + ((+item.productCost - item.productCost * item.productDiscount / 100) * +item.quantity)
        }
        else if (item.quantity) {
          price = Math.round(price + (item.productCost * item.quantity))
        }

        if (price > 5000) {
          this.priceSummary.delivery = 0
        }
        else {
          this.priceSummary.delivery = 500
        }
      });
      this.priceSummary.price = price;
      this.priceSummary.discount = price * 10/100;
      this.priceSummary.tax = Math.round(price *18/100);
      this.priceSummary.total = Math.round(price + price * 18/100 - price * 10/100 + this.priceSummary.delivery)
    });
  }


  paymentDone() {
    this.radioChecked = !this.radioChecked;
  }
  
  orderPlaced(value:string) {
    // this.event.emit(this.item)
    let name=this.item.firstName + " "+this.item.lastName
    let useraddress= this.item.address+ ", " + this.item.town + ", "+ this.item.city+ ", " + this.item.state+ ", " + this.item.country+ "-" + this.item.pincode
    let userid= this.item.userId
    let order=this.cartData

    let totalCost=this.priceSummary.total
    const orderData={
      customerName:name,
      customerAddress:useraddress,
      orderCost:totalCost,
      paymentMode:value,
      userId:userid,
      products:order
    }
    this.orderService.orderDetails(orderData).subscribe((result)=>{
      this.cartService.deleteAllcart(this.item.userId).subscribe(()=>{
      })
      
      this.popup=true
      setTimeout(() => {
        this.router.navigate(['my-orders'])
      }, 3000);
      let userStore = localStorage.getItem('user_id');
      let userData = userStore && JSON.parse(userStore);
      this.cartService.getCartList(userData._id)
    })
  }
}


   