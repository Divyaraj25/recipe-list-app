import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model"
import { Ingredients } from "../shared/ingredients.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class recipeService {
    ingredientsChanged = new Subject<Recipe[]>();
    recipes: Recipe[] = []

    constructor(private shoppingListService: ShoppingListService) { }

    setRecipes(recipes:Recipe[]){
        this.recipes = recipes
        this.ingredientsChanged.next(this.recipes.slice())
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(id:number){
        return this.recipes[id];
    }

    addIngredientsToShoppingList(ingredients: Ingredients[]) {
        this.shoppingListService.addIngredients(ingredients)
    }

    addRecipe(recipe:Recipe){
        this.recipes.push(recipe)
        this.ingredientsChanged.next(this.recipes.slice())
    }

    updateRecipe(index:number, newRecipe:Recipe){
        this.recipes[index] = newRecipe
        this.ingredientsChanged.next(this.recipes.slice())
    }

    deleteRecipe(index:number){
        this.recipes.splice(index, 1)
        this.ingredientsChanged.next(this.recipes.slice())
    }
}