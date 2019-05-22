const mongoose = require('mongoose');

const schema = {
 gmailAccount: { type: String, index:1,require:true },
 prohibitions: String,
 imageUrl: String,      //**** */
 userName: String,
    myFavorites: [{
        idMeal: Number,
        strMeal: { type: String, index:1 },
        strCatagory: String,
        strArea: String,
        strInstruction: String,
        strMealThumb: String,
        strYoutube: String
    }]
}

const user_schema = new mongoose.Schema(schema);
const profile = mongoose.model('profile' ,user_schema);
module.exports = profile;