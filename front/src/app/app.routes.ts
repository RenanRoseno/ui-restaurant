import { Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { TableComponent } from './components/table/table.component';
import { OrderComponent } from './components/order/order.component';

export const routes: Routes = [
    { path: "", redirectTo: "/products", pathMatch: "full" },
    { path: "products", component: ProductComponent, pathMatch: 'full' },
    { path: "tables", component: TableComponent },
    {
        path: "orders", component: OrderComponent
    },
];
