import React from 'react'
import {Route} from 'react-router-dom'
import Profile from '../components/Profile/Profile'
import Favorites from '../components/Favorite/favorites'
import { NavLink } from 'react-router-dom';
import {Navbar} from 'react-bootstrap'
import Ingredients from '../components/Ingredient/IngredientList'
import Register from '../components/Register/Register'
import { GiKnifeFork } from 'react-icons/gi'
import MainSearch from '../components/MainSearch/mainSearch'
const ReactRouter = () => {
    return (
        <React.Fragment>
            <Navbar className="Navbar" bg="dark">
                <a href="/"><GiKnifeFork className="logo"/></a>
                <NavLink exact to="/Home"><Navbar.Brand className="NavbarElement">Home</Navbar.Brand></NavLink>
                <NavLink exact to="/MyFavorites"><Navbar.Brand >Favorites</Navbar.Brand></NavLink>
                <NavLink exact to="/Ingredients"><Navbar.Brand>Ingredients</Navbar.Brand></NavLink>
                <NavLink exact to="/MyProfile"><Navbar.Brand>Profile</Navbar.Brand></NavLink>
            </Navbar>
            <Route exact path="/" component={Register}/>
            <Route exact path="/Home" component={MainSearch}/>
            <Route path="/Ingredients" component={Ingredients}/>
            <Route path="/Register" component={Register}/>
            <Route path="/MyFavorites" component={Favorites}/>
            <Route path="/MyProfile" component={Profile}/>
        </React.Fragment>
    )
}

export default ReactRouter