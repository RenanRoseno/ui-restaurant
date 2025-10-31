import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ProductFormComponent } from './form/product-form.component/product-form.component';
import Swal from 'sweetalert2'
import { sign } from 'crypto';
import { Product } from '../../models/product';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { error } from 'console';

@Component({
  selector: 'app-product',
  imports: [JsonPipe, TableModule, CommonModule, ButtonModule, Dialog, InputTextModule, ProductFormComponent, ConfirmDialog, ToastModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  constructor(private productService: ProductService, private cdr: ChangeDetectorRef, private confirmationService: ConfirmationService, private messageService: MessageService) {

  }

  public products: Array<any> = [];
  visible: boolean = false;
  isEdit: boolean = false;
  selectedProduct = signal<Product | null>(null);

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
    this.selectedProduct.set(null);
  }

  changeVisibility(value: boolean) {
    this.visible = value;
    if (!value) {
      this.selectedProduct.set(null);
      this.loadProducts();
    }

  }

  edit(product: Product) {
    console.log('Produto para editar:', product);
    this.visible = true;
    this.selectedProduct.set(product);
  }


  deleteProduct(product: Product) {
    console.log('Produto para deletar:', product);
    this.productService.delete(product.id).subscribe({
      next: (data) => {
        this.showSucessMessage();
        this.loadProducts();
      },
      error: (error) => this.showErrorMessage(error.message)
    });
  }


  confirm2(event: Event, product: Product) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Deseja realmente excluir esse produto?',
      header: 'Atenção',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Excluir',
        severity: 'danger',
      },

      accept: () => {
        this.deleteProduct(product);
      },
      reject: () => {

      },
    });
  }

  showErrorMessage(errorDescription: string): void {
    Swal.fire({
      icon: "error",
      title: "Erro",
      text: "Erro ao salvar produto!",
      footer: errorDescription,
      confirmButtonColor: "#d63530ff",
      customClass: {
        popup: 'my-swal-popup'
      },
      didOpen: (popup) => {
        popup.style.zIndex = '100000'; // maior que qualquer overlay do PrimeNG
      }
    });
  }

    showSucessMessage(): void {
      Swal.fire({
        title: "Sucesso!",
        text: "Produto deletado com sucesso.",
        icon: "success",
        confirmButtonColor: "#30d638ff"
      });
    }

    onDialogClose(): void {
      this.selectedProduct.set(null);
      console.log('Dialog closed, selectedProduct reset to null');
    }
}
