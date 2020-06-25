import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  //product:Product;

  product:Product = new Product(); //One of the simple solution to race condition.

  constructor(private productService:ProductService ,private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      () => {this.getProduct();}
    )
    
  }
  getProduct() { 
     const id:number = +this.route.snapshot.paramMap.get("id"); 
     this.productService.getProductById(id).subscribe(
      data => {this.product = data}
     );
     // The code above leads to Race Condition when html tries to accsses property,
     // But it remains usassigned and gives error.Though angular updates HTML on
     // receiving data later,this is called as DataBinding. TRY Async call or 
     // instantiate with empty object. We can also use {{product?.property}}. 
     // Using Safe-navigation-operator"?" while accessing property prevents error if object
     // is undefined or null.
  }


}
