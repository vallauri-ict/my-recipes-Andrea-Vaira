import { Component } from '@angular/core';
import { IngredientModel } from '../Models/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
  ingredients:IngredientModel[] = [
    new IngredientModel("cipolle", 5),
    new IngredientModel("pomodori", 10),
    new IngredientModel("spinaci", 7)
  ]
}
