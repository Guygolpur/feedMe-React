import React, { Component } from 'react';
import Ingredient from './Ingredient';
import './Ingredient.css'
export default class IngredientList extends Component {

  constructor(props){
    super(props);
    this.state = {
      ingredientList:[]
    }
    this.eachIngredient = this.eachIngredient.bind(this)
    this.add = this.add.bind(this)
    this.nextID = this.nextID.bind(this)
    this.getData = this.getData.bind(this)
  }
  
  componentDidMount() {
    this.getData();
  }

  getData() {
    const url = "https://feedme24.herokuapp.com/ingredients/getAllIngredients";
    fetch(`${url}`)
    .then(res=>res.json())
    .then(data=>data.map(ingredient => this.add(ingredient.ingredient,ingredient.type,ingredient.kosher)))
    .catch(err => console.error(err))
  }

  add(ingredient=null,type=null,kosher=null) {
    this.setState(prevState =>({
        ingredientList: [
          ...prevState.ingredientList,
          {
            id:this.nextID(),
            ingredient:ingredient,
            type:type,
            kosher:kosher
          }
        ]
    }))
  }

  nextID() {
    this.uniqueId = this.uniqueId || 0
    return this.uniqueId++
  }

  eachIngredient(ingredient,i){
    return(
      <section key={`container${i}`} className="ingredientBox">
        <Ingredient key={`ingredient${i}`} index={i}>
          <h2>{ingredient.ingredient}</h2>
          <h4>Type: {ingredient.type}</h4>
          <h4>Kosher: {ingredient.kosher}</h4>
        </Ingredient>
      </section>
    )
  }

  render() {
    return (
      <div>
        <div className="ingredients">
          <div className="ingredientList">
            <div className="containingBox">
              <h1>Our Ingredients</h1>
              <div>
                {this.state.ingredientList.map(this.eachIngredient)}
              </div>
            </div>  
          </div>
        </div>
      </div>
    );
  }
}