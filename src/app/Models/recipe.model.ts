import { IngredientModel } from './ingredient.model';

export class RecipeModel{
  public _id?:string;
  public name:string;
  public description:string;
  public imagePath:string;
  public ingredients:IngredientModel[]; // Array of ingredients for each recipe model object

  constructor(name:string, description:string, imagePath:string, ingredients:IngredientModel[]){
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}
