import { format } from 'date-fns';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.components.html',
  styleUrls: ['./search-item.components.css'],
})
export class SearchItemComponents {
  @Input() item: any;
  itemGoogle: any;
  @Input() listHistoryGoogle: any[] = [];
  @Output() onDeleteItem: EventEmitter<any> = new EventEmitter();
  @Output() onSearchItem: EventEmitter<any> = new EventEmitter<any>();

  onDelete() {
    this.onDeleteItem.emit(null);
  }

  onSearch() {
    this.onSearchItem.emit(this.item);
  }

  ngOnChanges() {
    this.itemGoogle = this.listHistoryGoogle?.find((itemG) =>
      itemG.formatted_address.includes(this.item.cep)
    );
  }

  formatDate(item: any) {
    return format(new Date(item?.dateSearch), 'dd/MM/yyyy hh:mm');
  }
}
