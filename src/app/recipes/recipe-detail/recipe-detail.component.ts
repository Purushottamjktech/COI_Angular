import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe!: Recipe;
  id!:number;
  constructor(
    private _recipeService: RecipeService,
    private route: ActivatedRoute,
    private _router:Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params)=>{
        this.id= +params['id'];
        this.recipe=this._recipeService.getToRecipe(this.id);
      }
    );
  }

  onAddShoppingList() {
    this._recipeService.addIngradientToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe(){
    this._router.navigate(['edit'], {relativeTo:this.route});
    // this._router.navigate(['../', this.id,'edit'],{relativeTo:this.route});
  }
}
