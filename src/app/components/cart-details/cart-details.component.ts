import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems:CartItem[] = [];
  totalPrice:number = 0;
  totalQuantity:number = 0;

  constructor(private cartService:CartService) { }

  ngOnInit() {
    this.getCartDetails();
  }

  getCartDetails(){

    //Get total price from cart service
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    //Get total quantity from cart service
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    //Get cart items from cart service
    this.cartItems = this.cartService.cartItems;

    //Call the computeCartTotal method from cart service
    this.cartService.computeCartTotal();
  }

  //Increment method for plus button in cart detail
  incrementQuantity(cartItem:CartItem){
    if(cartItem.quantity < 5){
      this.cartService.addToCart(cartItem);
    }
  }

  decrementQuantity(cartItem:CartItem){
    if(cartItem.quantity > 0){
      this.cartService.decrementQuantity(cartItem);
    }
  }

  removeFromCart(cartItem:CartItem){
    this.cartService.removeFromCart(cartItem);
  }
}
