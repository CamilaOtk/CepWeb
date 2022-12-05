import { Component } from '@angular/core';
import { xorBy } from 'lodash';
import { searchZipCode } from 'src/app/service/api/viacep';
import { searchZipCode as searchZipCodeGoogle } from 'src/app/service/api/google';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'CepWeb';
  objZipCode: any = null;
  objZipCodeGoogle: any = null;
  listHistory: any[] = [];
  listHistoryGoogle: any[] = [];
  activeLoading = false;

  ngOnInit() {
    const searchs = JSON.parse(
      localStorage.getItem('historic_searchs') ?? '[]'
    );
    const searchsGoogle = JSON.parse(
      localStorage.getItem('historic_searchs_google') ?? '[]'
    );

    this.listHistory = searchs;
    this.listHistoryGoogle = searchsGoogle;
  }

  deleteItemStorage(item: any) {
    this.listHistory = this.listHistory.filter((_item) => _item.id !== item.id);
    localStorage.setItem('historic_searchs', JSON.stringify(this.listHistory));

    this.listHistoryGoogle = this.listHistoryGoogle.filter(
      (_item) => _item.id !== item?.id
    );

    localStorage.setItem(
      'historic_searchs_google',
      JSON.stringify(this.listHistoryGoogle)
    );
  }

  async onSearchApi({
    search,
    saveStorage = true,
  }: {
    search: string;
    saveStorage: boolean;
  }) {
    this.activeLoading = true;
    const response = await searchZipCode(search);
    console.log('response', response)
    if (response.status === 200) {
      this.objZipCode = { ...response.data, type: 'success' };
      const responseGoogle = await searchZipCodeGoogle(search);
      this.objZipCodeGoogle = responseGoogle.data?.results[0];
    } else {
      this.objZipCode = {
        cep: search,
        type: 'error',
      };
    }

    const _id = `${
      this?.objZipCode?.cep ?? search
    } ${new Date().toISOString()}`;

    if (saveStorage === true) {
      const searchs = JSON.parse(
        localStorage.getItem('historic_searchs') ?? '[]'
      ).concat({
        ...(this?.objZipCode ?? {}),
        dateSearch: new Date(),
        id: _id,
      });

      const searchsGoogle = JSON.parse(
        localStorage.getItem('historic_searchs_google') ?? '[]'
      ).concat({
        ...(this?.objZipCodeGoogle ?? {}),
        dateSearch: new Date(),
        id: _id,
      });

      this.listHistory = searchs;
      this.listHistoryGoogle = searchsGoogle;

      localStorage.setItem('historic_searchs', JSON.stringify(searchs));
      localStorage.setItem(
        'historic_searchs_google',
        JSON.stringify(searchsGoogle)
      );
    }
  }
}
