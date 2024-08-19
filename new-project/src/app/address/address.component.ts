import { Component, OnInit,inject , ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../services/order.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { priceSummary } from '../data-type';
import { CartService } from '../services/cart.service';
import { faIndianRupee } from '@fortawesome/free-solid-svg-icons';
import { PaymentComponent } from '../payment/payment.component';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-address',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule,PaymentComponent],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})
export class AddressComponent implements OnInit {
  
  selectedAddressId: any;
  address: any | undefined
  add: any | undefined

  rupee=faIndianRupee
  check=faCheck

  addressData:any
  cartData: any | undefined

  radio: any
  faPlus = faPlus
  fb = inject(FormBuilder);
  router = inject(Router);
  addressForm !: FormGroup;
  updateForm !: FormGroup;
 

  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0,
  }

  free: any;
  notFree: any;

  constructor(private orderService: OrderService, private cartService: CartService, private cdr: ChangeDetectorRef) {}

  ngOnInit():void{

    this.getAddress();

    this.cartService.currentCart().subscribe((result) => {
      this.cartData = result;

      let price = 0;
      result.forEach((item) => {
      
        if (item.quantity && item.productDiscount) {
          price = price + ((+item.productCost - item.productCost * item.productDiscount / 100) * +item.quantity)
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
      this.priceSummary.discount = price * 10/100;
      this.priceSummary.total = Math.round(price - price * 10/100 + this.priceSummary.delivery)
    })
   

    let data = localStorage.getItem('cartProducts');
    let user = localStorage.getItem('user_id');
    let userId = user && JSON.parse(user)._id;

    this.updateForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      town: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      pincode: ['', Validators.required],
      deliverAt: ['', Validators.required],
      userId
    })
    
    this.addressForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      town: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      pincode: ['', Validators.required],
      deliverAt: ['', Validators.required],
      userId
    })

  }

  getAddress(){
    this.orderService.address().subscribe((result) => {
      this.address = result
    })
  }

  save() {
    this.orderService.postAddress(this.addressForm.value).subscribe({
      next: (res) => {
        this.addressForm.reset();
       this.cancel();
       this.getAddress();
      }
    })
  }
  update(_id: string) {
    this.orderService.updateAddress(_id, this.updateForm.value).subscribe({
      next: () => {
        this.close()
        this.isSelected(_id)
        this.selectAddress(_id)
        this.getAddress();
      }
    })
  }
  show = false
  hide = true
  edit = false

  toggle() {
    this.selectAddress(this.address)
    this.show = !this.show
    this.hide = !this.hide
    this.edit = false
  }

  togglefn(id: string) {
    this.selectAddress(this.address)
    this.edit = !this.edit;
    this.show = false
    this.hide = true
    id && this.orderService.getAddByid(id).subscribe({
      next: (res) => {
        this.add = res
        console.log(res)
      },
    })
  }
  cancel(){
    this.hide=true
    this.show=false
  }

  close() {
    this.edit = false
  }
  selectAddress(address: any) {
    this.hide=true
    this.show=false
    this.selectedAddressId = address._id; 
  }

  isSelected(address: any) {
    return this.selectedAddressId === address._id;
  }


  sendAddress=true
  deliver(addressData: any) {
    this.addressData=addressData
    this.sendAddress=false
    console.log(addressData)
  }

  addressChange(){
    this.addressData=false
    this.sendAddress=true
  }
}
