import { Ingredients } from "../shared/ingredients.model"
import { Subject } from "rxjs";

export class ShoppingListService {
    IngredientsChanged = new Subject<Ingredients[]>();
    Ingredients: Ingredients[] = [
        new Ingredients('Apples', 5),
        new Ingredients('Tomatoes', 10)
      ]

      getIngredients(){
          return this.Ingredients.slice();
      }

      addIngredient(ingredient: Ingredients){
          this.Ingredients.push(ingredient);
          this.IngredientsChanged.next(this.Ingredients.slice());
      }
      addIngredients(ingredients: Ingredients[]){
          this.Ingredients.push(...ingredients);
          this.IngredientsChanged.next(this.Ingredients.slice());
      }
}