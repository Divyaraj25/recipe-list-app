import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { recipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map, tap } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: recipeService) { }
    storeRecipes() {
        const recipes = this.recipeService.getRecipes()
        this.http.put('https://recipelist-5f729-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(response => { console.log(response) })
    }
    fetchRecipes() {
        return this.http.get<Recipe[]>('https://recipelist-5f729-default-rtdb.firebaseio.com/recipes.json')
            .pipe(map(
                recipes => {
                    return recipes.map(recipe => {
                        return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
                    })
                }
            ),
                tap(
                    recipe => {
                        this.recipeService.setRecipes(recipe)
                    }
                ))
    }
}