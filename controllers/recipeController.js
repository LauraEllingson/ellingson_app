const Recipe = require('../models/recipeModel');

// Get all recipes
const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find({});
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single recipe by ID
const getRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const recipe = await Recipe.findById(id);
        if (!recipe) {
            return res.status(404).json({ message: `Recipe with ID ${id} not found` });
        }
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const postRecipe = async (req, res) => {
    try {
        const { name, ingredients, instructions } = req.body;

        // Parse ingredients from textarea into an array of objects
        const formattedIngredients = ingredients
            .split('\n') // Split by new lines
            .map((ingredient) => ({
                name: ingredient.trim(), // Trim whitespace
            }));

        const recipe = new Recipe({
            name,
            ingredients: formattedIngredients,
            instructions,
        });

        await recipe.save();
        res.status(201).json({ message: 'Recipe created successfully', recipe });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
};

// Update a recipe
const putRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedRecipe = await Recipe.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedRecipe) {
            return res.status(404).json({ message: `Cannot find any recipe with ID ${id}` });
        }
        res.status(200).json(updatedRecipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a recipe
const deleteRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRecipe = await Recipe.findByIdAndDelete(id);
        if (!deletedRecipe) {
            return res.status(404).json({ message: `Cannot find recipe with ID ${id}` });
        }
        res.status(200).json(deletedRecipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const renderRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find({}); // Fetch all recipes from MongoDB
        res.render('recipes', { recipes }); // Render 'recipes' template with data
    } catch (error) {
        res.status(500).send('Error fetching recipes');
    }
};

const renderRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const recipe = await Recipe.findById(id);
        if (!recipe) {
            return res.status(404).send('Recipe not found');
        }
        res.render('recipe', { recipe }); // Render 'recipe' template with data
    } catch (error) {
        res.status(500).send('Error fetching the recipe');
    }
};


module.exports = {
    getRecipes,
    getRecipe,
    postRecipe,
    putRecipe,
    deleteRecipe,
    renderRecipes,
    renderRecipe,
};
