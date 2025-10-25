import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { TableComponent } from './components/table/table.component';
import { OrderComponent } from './components/order/order.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductComponent, TableComponent, OrderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ui-restaurant');
}
