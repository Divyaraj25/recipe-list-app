import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model"
import { Ingredients } from "../shared/ingredients.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class recipeService {
    selectedRecipe = new EventEmitter<Recipe>()

    recipes: Recipe[] = [
        new Recipe('The Recipe of cake',
            'This is a recipe of cake',
            'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
            [
                new Ingredients('Flour', 1),
                new Ingredients('Eggs', 10)
            ]),
        new Recipe('The Recipe of paneer', 'This is a recipe of paneer', 'https://th.bing.com/th/id/OIP.tokBIzztTnd9y1Qt-iEiXwHaLH?rs=1&pid=ImgDetMain',
            [
                new Ingredients('Paneer', 1),
                new Ingredients('Oil', 1)
            ]),
    ]

    constructor(private shoppingListService: ShoppingListService) { }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(id:number){
        return this.recipes[id];
    }

    addIngredientsToShoppingList(ingredients: Ingredients[]) {
        this.shoppingListService.addIngredients(ingredients)
    }
}