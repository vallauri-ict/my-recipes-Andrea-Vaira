import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { IngredientModel } from 'src/app/Models/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  @ViewChild('name') nameInputRef !: ElementRef;
  ingredientName : string = "";
  ingredientAmount : number = 0;

  constructor(private shoppingListService:ShoppingListService) { }


  addIngredients() {
    if(this.ingredientName.trim() != "" && this.ingredientAmount > 0){
      const newIngredient:IngredientModel = new IngredientModel(this.ingredientName, this.ingredientAmount);
      this.shoppingListService.addIngredient(newIngredient);
    }
    else {
      alert("Inserire un nome e una quantità valida");
    }
  }

  clearIngredients(){
    this.ingredientName = "";
    this.ingredientAmount = 0;
    this.nameInputRef.nativeElement.focus(); // focus on the input field
  }
}
