import { Component } from '@angular/core';
import { TableService } from '../../services/table.service';

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  constructor(private tableService: TableService) { }

  public tables: Array<any> = [];

  ngOnInit() {
    this.loadTables();
  }

  private loadTables(): void {
    this.tableService.getAll().subscribe((data: Array<any>) => {
      this.tables = data;
    });
  }
}
