import React, {Component} from "react";
import './mainSearch.css';
import Recipe from './Recipe'
import {Gmail} from '../Register/Register'
import { GiKnifeFork } from 'react-icons/gi'
import { IoIosAddCircle } from "react-icons/io";
import Footer from '../Footer/footer'
import Button from 'react-bootstrap/Button'


class MainSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
          ingredients: [],
          recipesList: [],
          ingredient1: null,
          ingredient2: null,
          ingredient3: null,
          userName: null,
          strMeal:null,

        }

        this.add                        = this.add.bind(this)
        this.nextID                     = this.nextID.bind(this)
        this.eachIngredient             = this.eachIngredient.bind(this)

        this.getRecipeData              = this.getRecipeData.bind(this);
        this.addRecipe                  = this.addRecipe.bind(this);
        this.handleChangeingredient1    = this.handleChangeingredient1.bind(this);
        this.handleChangeingredient2    = this.handleChangeingredient2.bind(this);
        this.handleChangeingredient3    = this.handleChangeingredient3.bind(this);
        this.eachRecipe                 = this.eachRecipe.bind(this);

        this.getInstructionData         = this.getInstructionData.bind(this);
        this.addInstruction             = this.addInstruction.bind(this);
        this.handleChangestrMeal        = this.handleChangestrMeal.bind(this);
        this.getInstructionInfo = this.getInstructionInfo.bind(this)
    }

    componentDidMount() {
        const url = "https://feedme24.herokuapp.com/ingredients/getAllIngredients";
        fetch(`${url}`)
        .then(res=>res.json())
        .then(data=>data.map(ingredient =>
             this.add(ingredient.ingredient)
            ))
            .catch(err => console.error(err))

    }
    nextID(){
        this.uniqueId = this.uniqueId || 0
        return this.uniqueId++
    }

    handleChangeingredient1(ingredient){
        this.setState({ingredient1:ingredient.target.value})
      }
    
    handleChangeingredient2(ingredient){
        this.setState({ingredient2:ingredient.target.value})
      }
    
    handleChangeingredient3(ingredient){
        this.setState({ingredient3:ingredient.target.value})
      }
    
      handleChangestrMeal(Meal){
          console.log(this.refs.strMeal1)
        this.setState({strMeal:Meal.target.value})
      }

    add(ingredient=null) {
        this.setState(prevState => ({
            ingredients:[
                ...prevState.ingredients,
                {
                    id:this.nextID(),
                    ingredient:ingredient
                }
            ]
        }))
    }


eachIngredient(ingredient,i){
        return(
         <option key={`ingredient${i}`}>{ingredient.ingredient}</option>
        )
    }



    onAddToFav(nameMealToAdd){
        if(!Gmail){
            console.log("Need to log in")
            return;
        }
        const url = `https://feedme24.herokuapp.com/addFavorite`;
        fetch(`${url}`,
          {method:'POST',
          body:`gmailAccount=${Gmail}&favName=${nameMealToAdd}`,                      //**** */
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
       }})
        .then(res => res.json())
          .catch(err => console.error(err));
    }

    getRecipeData() {
        if(!Gmail){
            console.log("Need to log in")
            return;
        }
        this.setState({recipesList:[]})
        const url = `https://feedme24.herokuapp.com/recipes?gmailAccount=${Gmail}&ingredient1=${this.state.ingredient1}&ingredient2=${this.state.ingredient2}&ingredient3=${this.state.ingredient3}`;
        fetch(`${url}`)
        .then(res=>res.json())
        .then(data=>data.map(item =>
            this.addRecipe(item.strMeal,item.strMealThumb,item.idMeal)))
            .catch(err => console.error(err))
            console.log(this.state.recipesList)
    }

addRecipe(strMeal=null,strMealThumb=null,idMeal=null){
    this.setState(prevState =>({
        recipesList: [
            ...prevState.recipesList,
            {
                id:this.nextID(),
                strMeal:strMeal,
                strMealThumb:strMealThumb,
                idMeal:idMeal,

            }
        ]
    }))
}








getInstructionData(MealName) {
    const url = `https://feedme24.herokuapp.com/getInstruction/${MealName}`;
    fetch(`${url}`)
    .then(res=>res.json())
    .then(data=>this.addInstruction(data[0].strMeal,data[0].strCategory,data[0].strArea,data[0].strInstructions,data[0].strMealThumb, data[0].strYoutube))
    .catch(err => console.error(err))
}

addInstruction(strMeal=null,strCategory=null,strArea=null,strInstructions=null,strMealThumb=null,strYoutube=null){
            this.instructions ={               
                id:this.nextID(),
                strMeal:strMeal,
                strCategory:strCategory,
                strArea:strArea,
                strInstructions:strInstructions,
                strMealThumb:strMealThumb,
                strYoutube:strYoutube               
            }
    this.forceUpdate();
}
getInstructionInfo(){
    if(!this.instructions)
    {
        return(<div></div>)
    }
    else{
    return(
        <div>
            <h3>{this.instructions.strMeal} instructions</h3>
            {/* <h5>{this.instructions.strCategory}</h5> */}
            <h5>{this.instructions.strArea}</h5>
            <h6 className='instructionsInfo'>{this.instructions.strInstructions}</h6>
            <img alt="" className="MealPhoto" src={`${this.instructions.strMealThumb}`}/>
            {/* <h3>{this.instructions.strMeal}</h3> */}
            <a target='_blank' rel="noopener noreferrer" className="youtubeLink" href={`${this.instructions.strYoutube}`}>{this.instructions.strMeal} Video</a>
        </div>
    )
    }

}












  eachRecipe(recipe,i){
        return(
        <div key={`container${i}`} className="card">
            <div className="card-body">
                <Recipe key={`recipe${i}`} index={i}>
                    <h4 className="strMeal" ref={`strMeal${i}`} onClick={this.handleChangestrMeal}>{recipe.strMeal}</h4>
                    <img alt="" className="MealPhoto" src={`${recipe.strMealThumb}`}/>
                    <button className='addButton'><IoIosAddCircle className="addIcon" onClick={()=>this.onAddToFav(recipe.strMeal)}/></button>
                    <Button className="recipeInstructions" onClick={()=>this.getInstructionData(recipe.strMeal)}>recipe instructions</Button>
                </Recipe>
            </div>
        </div> 
        )
    }

    render() {
  return (
      <div className="mainFunc">
    <div className="mainFunc">
        <div className="searchBG"></div>
        <h1>Search Recipe</h1>
        <GiKnifeFork/>
        <h2 className='instruction'>Enter 3 ingredients</h2>


    <div className="recipeForm">
        <span className="color-picker"></span>

        <label>
			<span className="custom-dropdown big">
			    <select type="text" name="ingredient1" onChange={this.handleChangeingredient1}>
                    <option> -- 1st ingredient -- </option>
                    {this.state.ingredients.map(this.eachIngredient)}
				</select>
			</span>
		</label>
 
        <label>
			<span className="custom-dropdown big">
			    <select type="text" name="ingredient2" onChange={this.handleChangeingredient2}>
                    <option> -- 2nd ingredient -- </option>
                    {this.state.ingredients.map(this.eachIngredient)}
				</select>
			</span>
		</label>

        <label>
			<span className="custom-dropdown big">
			    <select type="text" name="ingredient3" onChange={this.handleChangeingredient3}>
                    <option> -- 3rd ingredient -- </option>
                    {this.state.ingredients.map(this.eachIngredient)}
				</select>
			</span>
		</label>


            <input className="send" type="submit" name="submit" value="submit" onClick={this.getRecipeData}></input>
    </div>
    </div>
    <div className="recipeList">
         {this.state.recipesList.map(this.eachRecipe)}
    </div>
    <div>
        {this.getInstructionInfo()}
    </div>
    <Footer/>
    </div>
  )
}
}

export default MainSearch;