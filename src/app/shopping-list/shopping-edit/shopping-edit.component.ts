import { Component, EventEmitter, Output , ViewChild , ElementRef} from '@angular/core';
import { IngredientModel } from 'src/app/Models/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent {
  @ViewChild('name') _txtName!: ElementRef;
  @Output() ingredientAdded = new EventEmitter<IngredientModel>();
  ingredientName: string = '';
  ingredientAmount: number = 0;

  addIngredient() {
    if (this.ingredientAmount > 0) {
      const myIngredient: IngredientModel = new IngredientModel(
        this.ingredientName,
        this.ingredientAmount
      );
      this.ingredientAdded.emit(myIngredient);
    } else {
      alert('Inserire una quantità maggiore di 0');
    }
  }

  clearFields() {
    this.ingredientName = '';
    this.ingredientAmount = 0;
    this._txtName.nativeElement.focus();
  }
}
