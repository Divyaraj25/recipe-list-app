import { EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model"

export class recipeService {
    selectedRecipe = new EventEmitter<Recipe>()

    recipes: Recipe[] = [
        new Recipe('The Recipe of cake', 'This is a recipe of cake', 'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg'),
        new Recipe('The Recipe of paneer', 'This is a recipe of paneer', 'https://th.bing.com/th/id/OIP.tokBIzztTnd9y1Qt-iEiXwHaLH?rs=1&pid=ImgDetMain'),
    ]

    getRecipes() {
        return this.recipes.slice();
    }
}