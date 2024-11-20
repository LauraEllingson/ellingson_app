const express = require('express');
const router = express.Router();
const {
    getRecipes,
    getRecipe,
    postRecipe,
    putRecipe,
    deleteRecipe,
    renderRecipes,
    renderRecipe,
} = require('../controllers/recipeController'); 

// Fetch all recipes
router.get('/recipes', getRecipes);

// Fetch a single recipe by ID
router.get('/recipe/:id', getRecipe);

// Create a new recipe
router.post('/recipes', postRecipe);

// Update a recipe by ID
router.put('/recipe/:id', putRecipe);

// Delete a recipe by ID
router.delete('/recipe/:id', deleteRecipe);

// Render a page with all recipes
router.get('/recipes', renderRecipes)

// Render a page for a single recipe by ID
router.get('/recipe/:id', renderRecipe);

module.exports = router;
