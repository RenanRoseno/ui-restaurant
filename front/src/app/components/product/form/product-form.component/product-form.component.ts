import { Component, inject, Input, input, output, Signal, signal, effect } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { Product } from '../../../../models/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../../services/product.service';
import { error } from 'console';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-product-form',
  imports: [FormsModule, InputNumberModule, ButtonModule, IftaLabelModule, FloatLabel, InputTextModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent {
  changeVisibility = output<boolean>();
  saveEvent = output<Product>();
  @Input() selectedProduct!: Signal<Product | null>;
  form: FormGroup;

  productService = inject(ProductService);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
    });

    effect(() => {
      const product = this.selectedProduct();
      if (product) {
        this.form.patchValue({
          name: product.name,
          price: product.price
        });
      } else {
        this.form.reset();
        this.form.get('price')?.setValue(0);
      }
    });
  }

  ngOnInit() { }



  save(): void {
    if (this.form.valid) {
      const executation = !!this.selectedProduct() ? this.productService.update(this.selectedProduct()!.id, this.form.value) :
        this.productService.save(this.form.value);

      executation.subscribe({
        next: (data) => {
          this.showSucessMessage();
          this.form.reset();
          this.changeVisibility.emit(false);
        },
        error: (error) => this.showErrorMessage(error.message)
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  cancel(): void {
    this.changeVisibility.emit(false)
    this.form.reset();
    this.form.get('price')?.setValue(0);
  }

  showSucessMessage(): void {
    Swal.fire({
      title: "Sucesso!",
      text: "Produto salvo com sucesso.",
      icon: "success",
      confirmButtonColor: "#30d638ff"
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
}
