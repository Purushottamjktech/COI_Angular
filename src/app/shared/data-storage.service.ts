import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth/auth.service';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  // url:any = 'https://ng-course-recipe-book-afe76-default-rtdb.firebaseio.com/recipes.json';

  constructor(
    private _http: HttpClient,
    private _recpService: RecipeService,
    private _authService: AuthService
  ) {}

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
    return this._authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this._http.get<Recipe[]>(
          'https://ng-course-recipe-book-afe76-default-rtdb.firebaseio.com/recipes.json',

          {
            params: new HttpParams().set('auth', !user.token),
          }
        );
      }),
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

// fetchRecipes() {
//   return this._authService.user.pipe(
//     take(1),
//     exhaustMap((user) => {
//       return this._http
//         .get<Recipe[]>(
//           'https://ng-course-recipe-book-afe76-default-rtdb.firebaseio.com/recipes.json',

//           {
//             params: new HttpParams().set('auth', !user.token),
//           }
//         )
//         .pipe(
//           map((recipes) => {
//             return recipes.map((recipe) => {
//               return {
//                 ...recipe,
//                 ingredients: recipe.ingredients ? recipe.ingredients : [],
//               };
//             });
//           }),
//           tap((recipes) => {
//             this._recpService.setRecipe(recipes);
//           })
//         );
//     })
//   );
// }
