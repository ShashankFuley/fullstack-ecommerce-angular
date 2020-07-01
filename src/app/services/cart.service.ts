import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(cartItem: CartItem) {
    //Check If cart item  exist 
    let alreadyExist: boolean = false;
    let existingCartItem: CartItem = undefined;
    if (this.cartItems.length > 0) {
      existingCartItem = this.findCartItem(cartItem);
      alreadyExist = (existingCartItem != undefined);
    }

    //If item exists
    if (alreadyExist) {
      if(existingCartItem.quantity < 4) existingCartItem.quantity++;
    }
    else {
      this.cartItems.push(cartItem);
    }
    this.computeCartTotal();
  }


  computeCartTotal() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += (currentCartItem.unitPrice * currentCartItem.quantity);
      totalQuantityValue += currentCartItem.quantity;
    }
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }

  findCartItem(cartItem:CartItem): CartItem{
    return this.cartItems.find(tempCartItem => tempCartItem.id === cartItem.id);
  }

  decrementQuantity(cartItem: CartItem) {
    let existingCartItem = this.findCartItem(cartItem);
    existingCartItem.quantity--
    if(existingCartItem.quantity === 0){
      this.removeFromCart(existingCartItem);
    }
    else{
      //Call the compute total method
      this.computeCartTotal();
    }
  }

  removeFromCart(cartItem:CartItem){
    //Get index number of the cart in cart items list
    const removeItemIndex:number = this.cartItems.findIndex(value => value.id === cartItem.id);

    if(removeItemIndex > -1){
      this.cartItems.splice(removeItemIndex,1);
    }
    this.computeCartTotal();
  }

}
