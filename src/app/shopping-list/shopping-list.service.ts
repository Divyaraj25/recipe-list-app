import { EventEmitter } from "@angular/core";
import { Ingredients } from "../shared/ingredients.model"

export class ShoppingListService {
    IngredientsChanged = new EventEmitter<Ingredients[]>();
    Ingredients: Ingredients[] = [
        new Ingredients('Apples', 5),
        new Ingredients('Tomatoes', 10)
      ]

      getIngredients(){
          return this.Ingredients.slice();
      }

      addIngredient(ingredient: Ingredients){
          this.Ingredients.push(ingredient);
          this.IngredientsChanged.emit(this.Ingredients.slice());
      }
}