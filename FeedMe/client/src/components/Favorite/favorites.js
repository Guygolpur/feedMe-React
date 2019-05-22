import React, { Component } from "react";
import './favorite.css'
 import Favorite from './favorite'
 import { MdDelete } from 'react-icons/md'
import Footer from '../Footer/footer'
import {Gmail} from '../Register/Register'

class Favorites extends Component {
    constructor(props){
        super(props)
        this.state = {
            favoriteList:[]
        }
        this.eachFavorite = this.eachFavorite.bind(this)
        this.add = this.add.bind(this)
        this.nextID = this.nextID.bind(this)
        this.onDelete = this.onDelete.bind(this)
        this.getData = this.getData.bind(this)
    }
    componentDidMount() {
        this.getData()
    }
    getData(){
        if(!Gmail){
            console.log("Need to log in")
            return;
        }
        const url = `https://feedme24.herokuapp.com/profileFavorite?gmailAccount=${Gmail}`;    //******** */
        fetch(`${url}`)
        .then(res=>res.json())
        .then(data=>data.map(favorite =>
             this.add(favorite.strMeal,favorite.strArea,favorite.strMealThumb,favorite.strYoutube)
            ))
            .catch(err => console.error(err))

    }
        onDelete(nameMealToDelete){
            if(!Gmail){
            console.log("Need to log in")
            return;
            }
            console.log("delete click")
            const url = `https://feedme24.herokuapp.com/removeFavorite`;
            fetch(`${url}`,
              {method:'POST',
              body:`gmailAccount=${Gmail}&favName=${nameMealToDelete}`,                      //******** */
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
           }})
            .then(res => res.json())
              .catch(err => console.error(err));
              let filteredArray = this.state.favoriteList.filter(item =>  item.nameMeal !== nameMealToDelete )
              this.setState({favoriteList: filteredArray})
        }
        

    add(nameMeal=null,areaMeal=null,imageMeal=null,youtubeLink=null){
        this.setState(prevState =>({
            favoriteList: [
                ...prevState.favoriteList,
                {
                    id:this.nextID(),
                    nameMeal:nameMeal,
                    areaMeal:areaMeal,
                    imageMeal:imageMeal,
                    youtubeLink:youtubeLink

                }
            ]
        }))
    }
    nextID(){
        this.uniqueId = this.uniqueId || 0
        return this.uniqueId++
    }
    
    eachFavorite(favorite,i){
        return(
        <div key={`container${i}`} className="card">
            <div className="card-body">
                <Favorite key={`favorite${i}`} index={i}>
                    <h2 className="nameMeal">{favorite.nameMeal}</h2>
                    <h4 className="areaMeal">{favorite.areaMeal}</h4>
                    <a target='_blank' rel="noopener noreferrer" className="youtubeLink" href={`${favorite.youtubeLink}`}>Video</a>
                    <img className="MealPhoto"  alt={`${favorite.nameMeal}`}src={`${favorite.imageMeal}`}/>
                    <MdDelete className="deleteIcon" onClick={()=>this.onDelete(favorite.nameMeal)}/>
                </Favorite>
            </div>
        </div> 
        )
    }

  render() {
    return(
        <div>
            <div className="favoriteList">
            <h1 className="favoritesHead">Favorites</h1>
                {this.state.favoriteList.map(this.eachFavorite)}
            </div>
            <Footer/>
        </div>
    )
  }
}

export default Favorites;
