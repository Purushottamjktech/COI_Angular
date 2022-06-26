import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slform!:NgForm
  subscription!: Subscription;
  editMode = false;
  editedItemIndex!: number;
  editedItem!:Ingredient;
  constructor(private _slService: ShoppingListService) {}

  ngOnInit() {
    this.subscription = this._slService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem=this._slService.getToIngredient(index);
        this.slform.setValue({
          name:this.editedItem.name,
          amount:this.editedItem.amount,
        })
      }
    );
  }
  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this._slService.updateIngredient(this.editedItemIndex, newIngredient);
    }
    else{
      this._slService.addIngredient(newIngredient);
    }
    this.editMode=false;
    form.reset();
   
  }
  onClear(){
    this.slform.reset();
    this.editMode=false;
  }
  onDelete(){
    this._slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
