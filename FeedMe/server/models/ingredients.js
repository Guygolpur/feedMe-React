const mongoose = require('mongoose');

const schema = {
 ingredient: { type: String, index:1, required: true },
 type: String,
 kosher: String 
}

const user_schema = new mongoose.Schema(schema);
const Ingredient = mongoose.model('ingredient',user_schema);
module.exports = Ingredient;