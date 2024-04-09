import { Ingredients } from "../shared/ingredients.model"
import { Subject } from "rxjs";

export class ShoppingListService {
    IngredientsChanged = new Subject<Ingredients[]>();
    startedEditing = new Subject<number>()
    Ingredients: Ingredients[] = [
        new Ingredients('Apples', 5),
        new Ingredients('Tomatoes', 10)
    ]

    getIngredients() {
        return this.Ingredients.slice();
    }

    getIngredient(index: number) {
        return this.Ingredients[index];
    }

    addIngredient(ingredient: Ingredients) {
        this.Ingredients.push(ingredient);
        this.IngredientsChanged.next(this.Ingredients.slice());
    }
    addIngredients(ingredients: Ingredients[]) {
        this.Ingredients.push(...ingredients);
        this.IngredientsChanged.next(this.Ingredients.slice());
    }
    updateIngredient(index: number, newIngredient: Ingredients) {
        this.Ingredients[index] = newIngredient;
        this.IngredientsChanged.next(this.Ingredients.slice());
    }
    deleteIngredient(index: number) {
        this.Ingredients.splice(index, 1);
        this.IngredientsChanged.next(this.Ingredients.slice());
    }
}