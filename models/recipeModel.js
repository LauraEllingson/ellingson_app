const mongoose = require('mongoose');

// Schema for a recipe
const recipeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter a recipe name"],
        },
        ingredients: [
            {
                name: {
                    type: String,
                    required: [true, "Ingredient name is required"],
                },
            },
        ],
        instructions: {
            type: String,
            required: [true, "Please enter the cooking instructions"],
        },
    },
    {
        timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
    }
);

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;



