import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-product',
  imports: [JsonPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  constructor(private productService: ProductService) {
    
  }

  public products: Array<any> = [];

  ngOnInit() {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.productService.getAll().subscribe((data: Array<any>) => {
      this.products = data;
    });
  }
}
