import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  private totalPrice:number = 0.00;

  private totalQuantity:number = 0;

  constructor(private cartService:CartService) { }

  ngOnInit() {
    this.updateCartStatus();
    console.log(`In cart `+this.totalPrice+" "+this.totalQuantity)
  }


  updateCartStatus() {
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );
    console.log(this.totalPrice);
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
  }
}
