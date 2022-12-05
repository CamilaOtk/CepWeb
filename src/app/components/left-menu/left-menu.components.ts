import { Component, Input, Output, EventEmitter } from '@angular/core';
import { format } from 'date-fns';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.components.html',
  styleUrls: ['./left-menu.components.css'],
})
export class LeftmenuComponents {
  type: string = 'success';
  @Input() listHistory: any[] = [];
  @Input() listHistoryGoogle: any[] = [];

  @Output() deleteItemStorage: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSearchApi: EventEmitter<any> = new EventEmitter<any>();

  setType(_type: any) {
    this.type = _type;
  }

  onDeleteItem(item: any) {
    console.log('item', item);
    this.deleteItemStorage.emit(item);
  }

  onSearchItem(zipCode: any) {
    this.onSearchApi.emit({ search: zipCode, saveStorage: false });
  }

  getByType(list: any[], type: string) {
    return list.filter((item) => item.type?.includes(type));
  }

  formatDate(item: any) {
    return format(new Date(item?.dateSearch), 'dd/MM/yyyy hh:mm');
  }

  getItemGoogle(item: any) {
    console.log('listHistoryGoogle', this.listHistoryGoogle);
    return this.listHistoryGoogle.find((itemG) =>
      itemG.formatted_address.includes(item?.cep)
    );
  }
}
