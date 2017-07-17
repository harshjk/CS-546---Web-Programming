/******************************************
 *  Author : Harsh Jagdishbhai Kevadia   
 *  Created On : Wed Jul 12 2017
 *  File : recipes.js
 *******************************************/
const express = require('express');
const router = express.Router();
const data = require("../data");
const recipesData = data.recipes;

router.get("/", (req, res) => {
    recipesData.getAllRecipes().then((recipesList) => {
        res.json(recipesList);
    }, () => {
        // Something went wrong with the server!
        res.sendStatus(500);
    });
});

router.get("/:id", (req, res) => {
    recipesData.getRecipeById(req.params.id).then((recipe) => {
        res.json(recipe);
    }).catch(() => {
        res.status(404).json({ error: "Recipe not found" });
    });
});


router.post("/", (req, res) => {
    let recipe = req.body;

    if (!recipe) {
        res.status(400).json({ error: "You must provide data to create a recipe" });
        return;
    }

    if (!recipe.title) {
        res.status(400).json({ error: "You must provide a title" });
        return;
    }

    if (!recipe.ingredients) {
        res.status(400).json({ error: "You must provide a ingredients" });
        return;
    }

    if (!recipe.steps) {
        res.status(400).json({ error: "You must provide a steps" });
        return;
    }

    recipesData.addRecipe(recipe.title, recipe.ingredients, recipe.steps)
        .then((newRecipe) => {
            res.json(newRecipe);
        }, () => {
            res.sendStatus(500);
        });
});

router.put("/:id", (req, res) => {
    let recipe = req.body;

    if (!recipe) {
        res.status(400).json({ error: "You must provide data to update a recipe" });
        return;
    }

    let getRecipe = recipesData.getRecipeById(req.params.id).then(() => {
        return recipesData.updateRecipe(req.params.id, recipe)
            .then((updatedRecipe) => {
                res.json(updatedRecipe);
            }, (error) => {
                console.log(error);
                res.sendStatus(500);
            });
    }).catch(() => {
        res.status(404).json({ error: "Recipe not found" });
    });

});

router.delete("/:id", (req, res) => {
    let recipe = recipesData.getRecipeById(req.params.id).then(() => {
        return recipesData.removeRecipe(req.params.id)
            .then(() => {
                res.sendStatus(200);
            }).catch(() => {
                res.sendStatus(500);
            });

    }).catch((err) => {
        console.log(err);
        res.status(404).json({ error: "Recipe not found" });
    });
});

module.exports = router;