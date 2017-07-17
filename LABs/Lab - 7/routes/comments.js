/******************************************
 *  Author : Harsh Jagdishbhai Kevadia   
 *  Created On : Wed Jul 12 2017
 *  File : comments.js
 *******************************************/
const express = require('express');
const router = express.Router();
const data = require("../data");
const recipesData = data.recipes;

router.get("/recipe/:recipeId", (req, res) => {
    recipesData.getRecipeById(req.params.recipeId).then(() => {
        return recipesData.getAllCommentsByRecipeID(req.params.recipeId)
            .then((allComments) => {
                res.json(allComments);
            }, (error) => {
                console.log(error);
                res.sendStatus(500);
            });
    }).catch(() => {
        res.status(404).json({ error: "Recipe not found" });
    });
});


router.get("/:commentId", (req, res) => {
    recipesData.getCommentByCommentID(req.params.commentId).then((comment) => {
        res.json(comment);
    }).catch(() => {
        res.status(404).json({ error: "Comments not found" });
    });
});

router.post("/:recipeId", (req, res) => {
    let comment = req.body;

    if (!comment) {
        res.status(400).json({ error: "You must provide data to create a comment" });
        return;
    }

    if (!comment.poster) {
        res.status(400).json({ error: "You must provide a poster" });
        return;
    }

    if (!comment.comment) {
        res.status(400).json({ error: "You must provide a comment" });
        return;
    }

    recipesData.getRecipeById(req.params.recipeId).then(() => {
        return recipesData.addComment(req.params.recipeId, comment.poster, comment.comment)
            .then((newComment) => {
                res.json(newComment);
            }, () => {
                res.sendStatus(500);
            });
    }).catch(() => {
        res.status(404).json({ error: "Recipe not found" });
    });

});

router.put("/:recipeId/:commentId", (req, res) => {
    let updateCommentObject = req.body;

    if (!updateCommentObject) {
        res.status(400).json({ error: "You must provide data to update a comment" });
        return;
    }

    let getComment = recipesData.getRecipeById(req.params.recipeId).then(() => {
        recipesData.getCommentByCommentID(String(req.params.commentId)).then(() => {
            return recipesData.updateComment(req.params.recipeId, req.params.commentId, updateCommentObject)
                .then((updatedComment) => {
                    res.json(updatedComment);
                }, (error) => {
                    console.log(error);
                    res.sendStatus(500);
                });
        }, (error) => {
            res.status(404).json({ error: "Comment not found" });
        });
    }).catch(() => {
        res.status(404).json({ error: "Recipe not found" });
    });

});

router.delete("/:id", (req, res) => {
    let comment = recipesData.getCommentByCommentID(req.params.id).then(() => {
        return recipesData.deleteComment(req.params.id)
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