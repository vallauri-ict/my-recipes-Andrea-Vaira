import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeModel } from 'src/app/Models/recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  recipeName: string = '';
  recipeDescription: string = '';
  recipeImage: string = '';
  recipeIngredients: string = '';
  isNew: boolean = false;

  constructor(private route: ActivatedRoute, private recipeService:RecipeService, private router:Router) {}

  ngOnInit(): void {
    //If al contrario su param
    this.route.params.subscribe((params: Params) => {
      if (!params['id']) {
        console.log('New Recipe mode');
        this.isNew = true;
      } else {
        console.log('Edit recipe mode');
        this.isNew = false;
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
      this.recipeImage = reader.result!.toString();
    };
  }

  onSave() {
    let recipe = new RecipeModel(
      this.recipeName,
      this.recipeDescription,
      this.recipeImage,
      JSON.parse(this.recipeIngredients)
    );

    if(this.isNew){
      this.recipeService.addRecipe(recipe).subscribe(
        ()=>{
          alert('Ricetta caricata correttamente');
          this.recipeService.getRecipes();
          this.router.navigate(['/recipes']);
        },
        (err:Error)=>{
          alert('Errore nel caricamento della ricetta');
        }
      );
    }
    else{

    }
  }
}
