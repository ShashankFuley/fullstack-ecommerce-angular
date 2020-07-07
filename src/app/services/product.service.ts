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
  

  private baseUrl = "http://fullstackecommerce-env-1.eba-3qzspy8r.us-east-2.elasticbeanstalk.com/api";

  constructor(private httpClient: HttpClient) {}

  //This method will be called by ProductDetailsComponent
  getProductById(id: number):Observable<Product> {
    const searchUrl:string = `${this.baseUrl}/products/${id}` ;
    return this.httpClient.get<Product>(searchUrl);
  }

  //This method will be called by side bar
  getProductListPaginated(thePage:number,
                          theSize:number,
                          theCategoryId:number):Observable<GetProductResponse>{
    const searchUrl:string = `${this.baseUrl}/products/search/findByCategoryId?id=${theCategoryId}`
                              +`&page=${thePage}&size=${theSize}`;
    return this.httpClient.get<GetProductResponse>(searchUrl);
  }

  getProductCategory():Observable<ProductCategory[]>{
    const searchUrl:string = this.baseUrl+'/product-category';
    return this.httpClient.get<GetCategoryResponse>(searchUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  getProductBySearch(page:number,size:number,theKeyword:string):Observable<GetProductResponse>{
    const searchUrl:string = `${this.baseUrl}/products/search/findByNameContaining?`
                           + `name=${theKeyword}&page=${page}&size=${size}`;
    return this.getProducts(searchUrl);
  }

  private getProducts(searchUrl: string) {
    //return this.httpClient.get<GetProductResponse>(searchUrl).pipe(
    //  map(response => response._embedded.products)
    //);
    return this.httpClient.get<GetProductResponse>(searchUrl);
  }
}
interface GetProductResponse{
  _embedded: {
    products:Product[];
  },
  page:{
    "size" : number;
    "totalElements" : number,
    "totalPages" : number,
    "number" : number
  }
}
interface GetCategoryResponse{
  _embedded:{
    productCategory:ProductCategory[]
  }
}