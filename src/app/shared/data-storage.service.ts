import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { recipeService } from "../recipes/recipe.service";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: recipeService) { }
    storeRecipes() {
        const recipes = this.recipeService.getRecipes()
        this.http.put('https://recipelist-5f729-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(response => { console.log(response) })
    }
}