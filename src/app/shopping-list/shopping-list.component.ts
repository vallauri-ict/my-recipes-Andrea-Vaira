import { Component } from '@angular/core';
import { IngredientModel } from '../Models/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {

  constructor (public shoppingListService:ShoppingListService){}

  ngOnInit(){
    this.shoppingListService.getIngredients();
  }
}
