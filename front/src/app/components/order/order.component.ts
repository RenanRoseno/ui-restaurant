import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-order',
  imports: [JsonPipe],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent {
  constructor(private orderService: OrderService) {
  }
  public orders: Array<any> = [];

  ngOnInit(){
    this.orderService.getByTableSession('6').subscribe((data) => {
      this.orders = data;
    });
  }
}
