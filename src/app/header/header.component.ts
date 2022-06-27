import { Component } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
 constructor(private _dataStorageService: DataStorageService){}
  onSavedata(){
    this._dataStorageService.storeRecipe();
  }

  onFetchData(){
    this._dataStorageService.fetchRecipes().subscribe();
  }
}
