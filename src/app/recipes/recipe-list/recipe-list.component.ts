import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes!: Recipe[];

  constructor(private recipeService: RecipeService,private _router:Router, private _route:ActivatedRoute) {}

  ngOnInit() {
    this.recipes=this.recipeService.getRecipe();
  }
  onNewRecipe(){
this._router.navigate(['new'], {relativeTo: this._route});
  }

}
