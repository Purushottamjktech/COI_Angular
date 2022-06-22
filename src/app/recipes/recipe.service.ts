import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
recipeSelected=new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe(
      'Puri Sabzi',
      'Tasty',
      'https://th.bing.com/th/id/OIP.khtkS5HMs2UV_xFVJNhSPQHaEe?w=309&h=185&c=7&r=0&o=5&pid=1.7',
      [
        new Ingredient('puri',2),
        new Ingredient('sabzi',1)
      ]
    ),
    new Recipe(
      'Rice and Daal',
      'Delicious',
      'https://th.bing.com/th/id/OIP.3X6pBvAUa4tafAMRz0MATwHaEL?w=315&h=180&c=7&r=0&o=5&pid=1.7',
      [
        new Ingredient('Rice', 1),
        new Ingredient('Pulses',1),
        new Ingredient('Bread',1)
      ]
    ),
  ];
  constructor(private _shoppingList:ShoppingListService) { }
  getRecipe(){
    return this.recipes.slice();
  }
  addIngradientToShoppingList(ingredients:Ingredient[]){
    this._shoppingList.addOnIngredients(ingredients);
  }
}
