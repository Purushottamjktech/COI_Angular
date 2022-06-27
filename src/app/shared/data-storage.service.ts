import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  // url:any = 'https://ng-course-recipe-book-afe76-default-rtdb.firebaseio.com/recipes.json';

  constructor(private _http: HttpClient, private _recpService: RecipeService) {}

  storeRecipe() {
    const recipes = this._recpService.getRecipe();
    this._http
      .put(
        'https://ng-course-recipe-book-afe76-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchRecipes() {
   return this._http
      .get<Recipe[]>(
        'https://ng-course-recipe-book-afe76-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          this._recpService.setRecipe(recipes);
        })
      );
  }
}
