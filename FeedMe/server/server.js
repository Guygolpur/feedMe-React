const express = require('express');
const recipeCtl = require('./controller/recipe.ctl');
const profileCtl = require('./controller/profile.ctl');
const gmailAPI = require('./API/gmailAPI')
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended:true}));
app.use( (req, res, next)=> {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

/*** All routes ***/
app.get('/ingredients/getAllIngredients', recipeCtl.getIngredient);
app.get('/recipes', recipeCtl.getRecipeByIngredient);                           //send 2 or 3 ingredient
app.get('/getInstruction/:name',recipeCtl.getAllInstructionRecipeByName);       ///getInstruction/${name}
app.post('/addFavorite',profileCtl.addFavoriteList);
app.post('/addProfile',profileCtl.addProfile);
app.get('/getEmailByGmailAPI',gmailAPI.getUserByGmail);
app.post('/removeFavorite',profileCtl.removeFavoriteList);  
app.post('/editProfile', profileCtl.editProfile);           //edit specific profile: by giving userName update to newUserName, and prohibitions
app.get('/profileFavorite',profileCtl.getAllFavoriteByProfile);                 //show all favorites of spesific user (Postman- GET- Params)
app.get('/getProfileByGmailAccount',profileCtl.getProfileByGmailAccount); 

app.all('*', (req, res) => {
  console.log("try: \n https://feedme24.herokuapp.com/ingredients/getAllIngredients \t to get all ingredients from the list. \n https://feedme24.herokuapp.com/recipes \t\t\t\t to get all recipes that include 2/3 ingredients (Postman-GET- Body). \n https://feedme24.herokuapp.com/addFavorite \t\t\t to add new favorite by userName and by recipe name and update to specific user (Postman- POST- Body) \n https://feedme24.herokuapp.com/removeFavorite \t\t\t to delete recipe from favorite list by userName and recipe name and update specific user (Postman- POST- Body) \n https://feedme24.herokuapp.com/profileFavorite \t\t\t to show all favorites of spesific user (Postman- GET- Params) \n https://feedme24.herokuapp.com/addProfile \t\t\t to add Profile and check if no duplicates (Postman- POST- Body) \n https://feedme24.herokuapp.com/editProfile \t\t\t edit specific profile: by giving userName update to newUserName, and prohibitions (Postman- POST- Body) \n https://feedme24.herokuapp.com/getInstruction/:name \t\t get recipe instructions by giving recipe name- URL (i.e Cajun spiced fish tacos)");        //works
  res.send('try: \n https://feedme24.herokuapp.com/ingredients/getAllIngredients \t to get all ingredients from the list. \n https://feedme24.herokuapp.com/recipes \t\t\t\t to get all recipes that include 2/3 ingredients (Postman-GET- Body). \n https://feedme24.herokuapp.com/addFavorite \t\t\t to add new favorite by userName and by recipe name and update to specific user (Postman- POST- Body) \n https://feedme24.herokuapp.com/removeFavorite \t\t\t to delete recipe from favorite list by userName and recipe name and update specific user (Postman- POST- Body) \n https://feedme24.herokuapp.com/profileFavorite \t\t\t to show all favorites of spesific user (Postman- GET- Params) \n https://feedme24.herokuapp.com/addProfile \t\t\t to add Profile and check if no duplicates (Postman- POST- Body) \n https://feedme24.herokuapp.com/editProfile \t\t\t edit specific profile: by giving userName update to newUserName, and prohibitions (Postman- POST- Body) \n https://feedme24.herokuapp.com/getInstruction/:name \t\t get recipe instructions by giving recipe name- URL (i.e Cajun spiced fish tacos)');
});

app.listen(port, () => console.log(`listening on port ${port}`));



