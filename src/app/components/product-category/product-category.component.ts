import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  productCategories: ProductCategory[];
  constructor(private productService:ProductService) { }

  ngOnInit() {
    this.listProductCategory();
  }
  
  listProductCategory(){
    this.productService.getProductCategory().subscribe(
      data => {
        this.productCategories = data;
      }
    );
  }
}
