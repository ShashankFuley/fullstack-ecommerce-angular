import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] ;
  currentCategoryId: number = 1;
  previousCategoryId: number =1;
  searchMode:boolean  = false;
  previousKeyword:string = null;

  thePageNumber:number = 1;
  thePageSize:number = 5;
  theTotalElements:number = 0;
  theTotalPage:number = 0;
  
  constructor(private productService: ProductService, private route: ActivatedRoute,
              private cartService:CartService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      () => {
        this.listProducts();
      });
  }
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~// 
  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has("keyword");
    if(this.searchMode){
      this.handleSearchProduct();
    }else{
      this.handleListProducts();
    }
  }
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
  handleSearchProduct() {
    const theKeyword:string = this.route.snapshot.paramMap.get("keyword");
    if(this.previousKeyword != theKeyword) { this.thePageNumber = 1};
    this.previousKeyword = theKeyword;
    this.productService.getProductBySearch(this.thePageNumber-1,this.thePageSize,theKeyword).subscribe(
      this.processData()
    )
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
  handleListProducts(){

    const hasCategoryId: boolean = this.route.snapshot.paramMap.has("id");

    if (hasCategoryId) {
      //+ to convert string to number.
      this.currentCategoryId = +this.route.snapshot.paramMap.get("id");

    } else {
      this.currentCategoryId = 1;
    }

    //
    //Check if we have a different category than previous one.
    //Note:Angular will reuse a component if its is being veiwed.
    //If we have different category than previous one then set "thePageNumber" to 1.
    //

    if(this.previousCategoryId != this.currentCategoryId) {this.thePageNumber = 1};

    this.previousCategoryId = this.currentCategoryId;

    this.productService.getProductListPaginated(this.thePageNumber -1,
                                                this.thePageSize,
                                                this.currentCategoryId).subscribe(
        this.processData()
    );
  }
  addToCart(product:Product){
    const cartItem:CartItem = new CartItem(product);
    this.cartService.addToCart(cartItem);
  }
  
  updatePageSize(pageSize:number){
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

  private processData(){
    return data => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
      this.theTotalPage = data.page.totalPages;
    };
  }
}
