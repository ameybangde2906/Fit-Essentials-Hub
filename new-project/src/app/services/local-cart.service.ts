import { Injectable } from '@angular/core';
import { product } from '../data-type';
import { EventEmitter } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LocalCartService {
  cartData = new EventEmitter<product[] | []>();

  private cartKey = 'cartProducts'

  constructor() { }

  getCartData(): any | undefined[] {
    const cartData = localStorage.getItem(this.cartKey);
    return cartData ? JSON.parse(cartData) : [];
  }

  removeItemFromCart(itemId: string): void {
    let cartData = localStorage.getItem('cartProducts');
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item: product) => itemId !== item._id);
      console.log(items);
      localStorage.setItem('cartProducts', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  getCart() {
    let cartData = localStorage.getItem('cartProducts')
    return cartData && JSON.parse(cartData)
  }

  updateCart(cart: any) {
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  increment(i: any) {
    let cart = this.getCart();
    cart[i].quantity++;
    this.updateCart(cart)
  }

  decrement(i: any) {
    let cart = this.getCart();
    if (cart[i].quantity > 1) {
      cart[i].quantity--;
      this.updateCart(cart)
    }

  }
}
