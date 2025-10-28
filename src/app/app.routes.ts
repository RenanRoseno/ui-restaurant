import { Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { App } from './app';
import { TableComponent } from './components/table/table.component';
import { OrderComponent } from './components/order/order.component';

export const routes: Routes = [
    { path: "products", component: ProductComponent, pathMatch: 'full' },
    { path: "tables", component: TableComponent },
    {
        path: "orders", component: OrderComponent
    },
    /*{ path: "products", component: ProductComponent },
    { path: "posts/create", component: Create },
    { path: "posts/:postId/edit", component: Edit },
    { path: "posts/:postId", component: Show }*/
];
