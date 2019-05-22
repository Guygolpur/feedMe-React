const axios = require('axios');

class ResultGenerator {

    constructor() {
        this.arr = [];
    }

    addBy3Ingredients(MealsContainIngredient1, MealsContainIngredient2, MealsContainIngredient3) { // if meal found in search results of all 3 ingrediants
        let temp = [];
        for (let i in MealsContainIngredient1.meals) {
            for (let j in MealsContainIngredient2.meals) {
                if (JSON.stringify(MealsContainIngredient1.meals[i]) === JSON.stringify(MealsContainIngredient2.meals[j])) {
                    temp.push(MealsContainIngredient2.meals[j]);
                }
            }
        }
        for (let i in MealsContainIngredient1.meals) {
            for (let j in MealsContainIngredient3.meals) {
                if (JSON.stringify(temp[i]) === JSON.stringify(MealsContainIngredient3.meals[j])) {
                    this.arr.push(MealsContainIngredient3.meals[j]);
                }
            }
        }
    }

    addBy2Ingredients(MealsContainIngredient1, MealsContainIngredient2) { // if a meal found in both search results
        for (let i in MealsContainIngredient1.meals) {
            for (let j in MealsContainIngredient2.meals) {
                if (JSON.stringify(MealsContainIngredient1.meals[i]) === JSON.stringify(MealsContainIngredient2.meals[j])) {
                    this.arr.push(MealsContainIngredient2.meals[j]);
                }
            }
        }
    }

    checkHowManyParams(ingredient1, ingredient2, ingredient3, MealsContainIngredient1, MealsContainIngredient2, MealsContainIngredient3) {
        if (ingredient1 && ingredient2 && ingredient3) {
            this.addBy3Ingredients(MealsContainIngredient1, MealsContainIngredient2, MealsContainIngredient3);
        }
        else if (ingredient1 && ingredient2 && !ingredient3) {
            this.addBy2Ingredients(MealsContainIngredient1, MealsContainIngredient2);
        }
        else if (ingredient1 && !ingredient2 && ingredient3) {
            this.addBy2Ingredients(MealsContainIngredient1, MealsContainIngredient3);
        }
        else if (!ingredient1 && ingredient2 && ingredient3) {
            this.addBy2Ingredients(MealsContainIngredient2, MealsContainIngredient3);
        }
        else
            return false;
    }

    async deleteProhebition(toDelete) {
        try {
            let j = 0;
            let len = this.arr.length;
            for (let i = 0; i < len; i++) {
                const { data: result1 } = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${this.arr[i-j].strMeal}`)
                for (let z = 1; z < 21; z++)                                         //check all the ingredient in the ricipe
                {
                    if(result1.meals[0][`strIngredient${z}`] == null)
                        continue;
                    if (result1.meals[0][`strIngredient${z}`].toUpperCase() === toDelete.toUpperCase()) {
                        this.arr.splice(i - j, 1);
                        j++;                                     //if there is prohebition in the recipe drop this recipe 
                    }
                }
            }
        } catch (err) { console.error(err) }
    }

    empty() {
        this.arr = [];
    }

    get getArr() {
        return this.arr;
    }
}

let newResultGenerator = new ResultGenerator;
module.exports = newResultGenerator;