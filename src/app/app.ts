import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { TableComponent } from './components/table/table.component';
import { OrderComponent } from './components/order/order.component';
import { MegaMenuItem } from 'primeng/api';
import { MegaMenu } from 'primeng/megamenu';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductComponent, TableComponent, OrderComponent, MegaMenu, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(private router: Router) {}
  protected readonly title = signal('ui-restaurant');
   items: MegaMenuItem[] | undefined;

  ngOnInit() {
        this.items = [
            {
                label: '',
                icon: 'pi pi-home',
                routerLink: ['/'],
            },
            {
                label: 'Produtos',
                icon: 'pi pi-book',
                routerLink: ['/products'],
            },
                {
                label: 'Pedidos',
                icon: 'pi pi-file-edit',
                routerLink: ['/orders'],
            },
                {
                label: 'Mesas',
                icon: 'pi pi-table',
                routerLink: ['/tables'],
            },
                  {
                label: 'Sessões',
                icon: 'pi pi-book',
                routerLink: ['/'],
            }
        ];
    }
}
