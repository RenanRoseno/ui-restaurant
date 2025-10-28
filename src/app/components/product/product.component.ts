import { ChangeDetectorRef, Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-product',
  imports: [JsonPipe, TableModule, CommonModule, ButtonModule, Dialog, InputTextModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  constructor(private productService: ProductService, private cdr: ChangeDetectorRef) {

  }

  public products: Array<any> = [];
  visible: boolean = false;

  ngOnInit() {
    this.loadProducts();

  }

  private loadProducts(): void {
    this.productService.getAll().subscribe((data: Array<any>) => {
      this.products = data;
      this.cdr.detectChanges();
    });
  }


  showDialog() {
    this.visible = true;
  }
}
