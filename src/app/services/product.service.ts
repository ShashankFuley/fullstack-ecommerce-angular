import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  

  private baseUrl = "http://localhost:8080/api";

  constructor(private httpClient: HttpClient) {}

  getProductById(id: number):Observable<Product> {
    const searchUrl:string = `${this.baseUrl}/products/${id}` ;
    return this.httpClient.get<Product>(searchUrl);
  }

  getProductList(theCategoryId:number):Observable<Product[]>{
    const searchUrl:string = this.baseUrl+'/products/search/findByCategoryId?id='+theCategoryId;
    return this.getProducts(searchUrl);
  }

  getProductCategory():Observable<ProductCategory[]>{
    const searchUrl:string = this.baseUrl+'/product-category';
    return this.httpClient.get<GetCategoryResponse>(searchUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  getProductBySearch(theKeyword:string){
    const searchUrl:string = `${this.baseUrl}/products/search/findByNameContaining?name=${theKeyword}`;
    return this.getProducts(searchUrl);
  }

  private getProducts(searchUrl: string) {
    return this.httpClient.get<GetProductResponse>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }
}
interface GetProductResponse{
  _embedded: {
    products:Product[];
  }
}
interface GetCategoryResponse{
  _embedded:{
    productCategory:ProductCategory[]
  }
}