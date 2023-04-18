import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeModel } from 'src/app/Models/recipe.model';
import { RecipeService } from '../recipe.service';
import { IngredientModel } from 'src/app/Models/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  recipeName: string = '';
  recipeDescription: string = '';
  recipeImageBase64: string = '';
  recipeImageURL: string = '';
  recipeIngredients: string = '';
  isNew: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //If al contrario su param
    this.route.params.subscribe((params: Params) => {
      if (!params['id']) {
        console.log('New Recipe mode');
        this.isNew = true;
      } else {
        console.log('Edit recipe mode');
        this.isNew = false;
        this.caricaForm();
      }
      // this.isNew = params['new'];
    });
  }

  onFileSelected(event: any) {
    let file = event.target.files[0];
    let reader = new FileReader();
    // Restituisce l'immagine codificata in Base64
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.recipeImageBase64 = reader.result!.toString();
    };
  }

  onSave() {
    let ingredients:IngredientModel[] = [];
    // try {
    //   ingredients = this.parseIngredients(this.recipeIngredients);
    // } catch (error) {
    //   console.log('Errore: '+error);
    // }
    ingredients = this.parseIngredients(this.recipeIngredients);

    let image = this.recipeImageBase64 || this.recipeImageURL || this.recipeService.selectedRecipe?.imagePath || '';

    let recipe = new RecipeModel(
      this.recipeName,
      this.recipeDescription,
      image,
      ingredients
    );

    if (this.isNew) {
      this.recipeService.addRecipe(recipe).subscribe(
        () => {
          alert('Ricetta caricata correttamente');
          this.recipeService.getRecipes();
          this.router.navigate(['/recipes']);
        },
        (err: Error) => {
          alert('Errore nel caricamento della ricetta');
        }
      );
    } else {
      this.recipeService
        .updateRecipe(this.recipeService.selectedRecipe._id, recipe)
        .subscribe(
          () => {
            alert('Ricetta aggiornata correttamente ');
            this.recipeService.getRecipes();
            this.router.navigate(['/recipes', this.recipeService.selectedRecipe._id]);
          },
          (err: Error) => {
            alert("Errore nell'aggiornamento della ricetta");
          }
        );
    }
  }

  parseIngredients(ingredientsInput: string): IngredientModel[] {
    let ingredients: IngredientModel[] = [];
    let tempArray = ingredientsInput.split('\n');
    for (const ing of tempArray) {
      let tempObj = ing.split(':');
      if (tempObj[0] && tempObj[1] && !isNaN(parseInt(tempObj[1])))
        ingredients.push({ name: tempObj[0], amount: parseInt(tempObj[1]) });
    }
    console.log(ingredients);
    return ingredients;
  }

  caricaForm(){
    if(this.recipeService.selectedRecipe){
      this.recipeName = this.recipeService.selectedRecipe.name;
      this.recipeDescription = this.recipeService.selectedRecipe.description;
      this.recipeIngredients = this.serializeIngredients(this.recipeService.selectedRecipe.ingredients);
    }
  }

  serializeIngredients(ingredientArray:IngredientModel[]):string{
    let ingredients ='';
    for (const ing of ingredientArray) {
      ingredients+= `${ing.name}:${ing.amount}\n`;
    }
    return ingredients;
  }
}
