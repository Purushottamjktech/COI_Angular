import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSub! :Subscription;
  isAuthenticated = false;

  constructor(
    private _dataStorageService: DataStorageService,
    private _authService: AuthService
  ) {}

    ngOnInit(){
      this._authService.user.subscribe( user => {

        this.isAuthenticated= !! user;
        console.warn(!user);
        console.warn(!!user);
        
        
      }
      )
    }

  onSavedata() {
    this._dataStorageService.storeRecipe();
  }

  onFetchData() {
    this._dataStorageService.fetchRecipes().subscribe();
  }

  onLogut(){
    this._authService.logout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
