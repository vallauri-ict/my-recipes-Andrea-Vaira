import { Component, Output, EventEmitter } from '@angular/core';
import { IngredientModel } from 'src/app/Models/ingredient.model';
import {RecipeModel} from 'src/app/Models/recipe.model'
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  constructor(public recipeService:RecipeService){}
  //public --> se vogliamo usarlo anche nell'HTML

  ngOnInit(): void {
    this.recipeService.getRecipes();
  }
}
