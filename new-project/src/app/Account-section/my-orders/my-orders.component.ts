import { Component , Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { CartService } from '../../services/cart.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faIndianRupee } from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';
import { AccountsComponent } from '../accounts/accounts.component';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule,RouterModule, AccountsComponent,],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent {

  rupee=faIndianRupee
  show=false
  orderData: any;
  constructor(private orderService:OrderService, private cartService:CartService ){ }

  ngOnInit(){
    this.orderService.orderList().subscribe((result)=>{
      this.orderData=result
      if(this.orderData?.length){
        this.show=false
      }
      else{
        this.show=true
      }
    })
  }
}