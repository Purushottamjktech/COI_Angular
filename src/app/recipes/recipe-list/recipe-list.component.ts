import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit,OnDestroy {
  recipes!: Recipe[];
  subscription!:Subscription;

  constructor(private _recipeService: RecipeService,private _router:Router, private _route:ActivatedRoute) {}

  ngOnInit() {
  this.subscription=  this._recipeService.recipeChanged.subscribe(
      (recipe:Recipe[]) =>{
        this.recipes= recipe;
      }
    );
    this.recipes=this._recipeService.getRecipe();

  }
  onNewRecipe(){
this._router.navigate(['new'], {relativeTo: this._route});
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
