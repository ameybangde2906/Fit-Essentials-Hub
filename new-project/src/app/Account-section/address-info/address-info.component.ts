import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AccountsComponent } from '../accounts/accounts.component';


@Component({
  selector: 'app-address-info',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule, FontAwesomeModule,AccountsComponent],
  templateUrl: './address-info.component.html',
  styleUrl: './address-info.component.css'
})
export class AddressInfoComponent {
  showDots: boolean[] = [];
  address: any
  addByid: any
  addressForm !: FormGroup
  threeDots = faEllipsisVertical
  faPlus = faPlus
  constructor(private orderService: OrderService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.getAddress()

    let data = localStorage.getItem('cartProducts');
    let user = localStorage.getItem('user_id');
    let userId = user && JSON.parse(user)._id;

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
    });
  }

  getAddress() {
    this.orderService.address().subscribe((result) => {
      this.address = result
    })
  }

  addAddress() {
    this.orderService.postAddress(this.addressForm.value).subscribe({
      next: () => {
        this.cancel()
        this.addressForm.reset()
        this.getAddress()
      }
    })
  }

  new = true
  renew = false
  div=true
  getById(id: string) {
    this.orderService.getAddByid(id).subscribe((result) => {
      this.addByid = result
      this.show = true
      this.hide = true
      this.new = false
      this.renew = true
      this.div=false
      if (this.addByid) {
        this.addressForm.controls['firstName'].setValue(this.addByid.firstName)
        this.addressForm.controls['lastName'].setValue(this.addByid.lastName)
        this.addressForm.controls['phone'].setValue(this.addByid.phone)
        this.addressForm.controls['email'].setValue(this.addByid.email)
        this.addressForm.controls['address'].setValue(this.addByid.address)
        this.addressForm.controls['town'].setValue(this.addByid.town)
        this.addressForm.controls['city'].setValue(this.addByid.city)
        this.addressForm.controls['state'].setValue(this.addByid.state)
        this.addressForm.controls['country'].setValue(this.addByid.country)
        this.addressForm.controls['pincode'].setValue(this.addByid.pincode)
        this.addressForm.controls['deliverAt'].setValue(this.addByid.deliverAt)
        this.addressForm.controls['userId'].setValue(this.addByid.userId)
      }
    })
  }

  cancel() {
    this.show = false
    this.hide = true
    this.div=true
  }

  updateAddress(id: string) {
    this.orderService.updateAddress(id, this.addressForm.value).subscribe({
      next: () => {
        this.cancel()
        this.getAddress()
        this.div=true
      }
    })
  }

  show = false
  hide = true
  edit = false
  toggle() {
    this.show = true
    this.hide = false
    this.edit = false
    this.new = true
    this.renew = false
    this.div=true
    this.addressForm.controls['firstName'].setValue('')
    this.addressForm.controls['lastName'].setValue('')
    this.addressForm.controls['phone'].setValue('')
    this.addressForm.controls['email'].setValue('')
    this.addressForm.controls['address'].setValue('')
    this.addressForm.controls['town'].setValue('')
    this.addressForm.controls['city'].setValue('')
    this.addressForm.controls['state'].setValue('')
    this.addressForm.controls['country'].setValue('')
    this.addressForm.controls['pincode'].setValue('')
    this.addressForm.controls['deliverAt'].setValue('')
  }
  
deleteAdd(id:string){
  this.orderService.deleteAddByid(id).subscribe((result)=>{
    this.getAddress()
  })
}
}

