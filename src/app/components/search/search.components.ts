import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.components.html',
  styleUrls: ['./search.components.css'],
})
export class SearchComponents {
  inputText: string = '';
  @Output() onSearch: EventEmitter<any> = new EventEmitter<any>();

  onInput(event: any): void {
    this.inputText = event.target.value;
  }

  onPress(event: any): void {
    if ('13'.includes((event.which || event.keyCode).toString()))
      this.setItemInLocalStorage(this.inputText);
    //   console.log(event ,"helloooo")
  }

  onPressIcon(): void {
    this.setItemInLocalStorage(this.inputText);
  }

  async setItemInLocalStorage(search: string) {
    await this.onSearch.emit({ search: search });
  }
}
