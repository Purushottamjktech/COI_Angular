import {  Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();
  // recipes: Recipe[] = [
  //   new Recipe(
  //     'Puri Sabzi',
  //     'Tasty',
  //     'https://th.bing.com/th/id/OIP.khtkS5HMs2UV_xFVJNhSPQHaEe?w=309&h=185&c=7&r=0&o=5&pid=1.7',
  //     [
  //       new Ingredient('puri',2),
  //       new Ingredient('sabzi',1)
  //     ]
  //   ),
  //   new Recipe(
  //     'Rice and Daal',
  //     'Delicious',
  //     'https://th.bing.com/th/id/OIP.3X6pBvAUa4tafAMRz0MATwHaEL?w=315&h=180&c=7&r=0&o=5&pid=1.7',
  //     [
  //       new Ingredient('Rice', 1),
  //       new Ingredient('Pulses',1),
  //       new Ingredient('Bread',1)
  //     ]
  //   ),
  // ];
   recipes: Recipe[] = [];

  constructor(private _shoppingList:ShoppingListService) { }
  getRecipe(){
    return this.recipes.slice();
  }

  setRecipe(recipes:Recipe[]) {
    this.recipes=recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  getToRecipe(index:number){
    return this.recipes.slice()[index];
  }

  addIngradientToShoppingList(ingredients:Ingredient[]){
    this._shoppingList.addOnIngredients(ingredients);
  }

  addRecipe(recipe:Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index:number,newRecipe:Recipe) {
    this.recipes[index] =newRecipe;
    this.recipeChanged.next(this.recipes.slice());

  }
  deleteRecipe(index:number) {
    this.recipes.splice(index,1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
