const Ingredient = require('../models/ingredients');
const Profile = require('../models/profiles');
const axios = require('axios');
let newArr = require('./class/ResultGenerator');            //my class into controller/class

module.exports = {
   async getIngredient(req, res) {
      try {
         const ingredientsFound = await Ingredient.find({})
         console.log(ingredientsFound);
         return res.json(ingredientsFound);
      } catch (err) { console.error(err);return res.json(err); }
   },
   async getRecipeByIngredient(req, res) {
      try {
         newArr.empty();
         const { gmailAccount = null, ingredient1 = null, ingredient2 = null, ingredient3 = null } = req.query;
         const userFound = await Profile.find({ gmailAccount: gmailAccount })
         if (!userFound.length) {
            console.log(`There is no user: ${gmailAccount}`);
            return res.json(`There is no user: ${gmailAccount}`);
         }
         const prohebition = userFound[0].prohibitions;

         const { data: result1 } = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient1}`);
         const { data: result2 } = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient2}`);
         const { data: result3 } = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient3}`);

         if (newArr.checkHowManyParams(ingredient1, ingredient2, ingredient3, result1, result2, result3) == false) {
            return res.status(404).json("there is no parameter. please send 2 or 3 parameter");
         }
         await newArr.deleteProhebition(prohebition);
         return res.json(newArr.getArr);
      } catch (err) { console.error(err);return res.json(err); }

   },
   async getAllInstructionRecipeByName(req, res) {
      try {
         const { name = null } = req.params;
         const { data: result1 } = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
         res.json(result1.meals);
      } catch (err) { console.error(err);return res.json(err); }
   },
}