/******************************************
 *  Author : Harsh Jagdishbhai Kevadia   
 *  Created On : Tue Jul 11 2017
 *  File : recipes.js
 *******************************************/
const mongoCollections = require("../config/mongoCollections");
const recipes = mongoCollections.recipes;
const uuid = require('uuid/v4');

let exportedMethods = {
    getAllRecipes() {
        return recipes().then((recipeCollection) => {
            return recipeCollection.find({}).project({ _id: 1, title: 1 }).toArray();
        });
    },
    getRecipeById(id) {
        return recipes().then((recipeCollection) => {
            return recipeCollection.findOne({ _id: id }).then((recipe) => {
                if (!recipe) throw "Recipe not found";
                return recipe;
            });
        });
    },
    addRecipe(title, ingredients, steps) {
        return recipes().then((recipeCollection) => {
            let newRecipe = {
                _id: uuid(),
                title: title,
                ingredients: ingredients,
                steps: steps,
                comments: []
            };

            return recipeCollection.insertOne(newRecipe).then((newInsertInformation) => {
                return newInsertInformation.insertedId;
            }).then((newId) => {
                return this.getRecipeById(newId);
            });
        });
    },
    removeRecipe(id) {
        return recipes().then((recipeCollection) => {
            return recipeCollection.removeOne({ _id: id }).then((deletionInfo) => {
                if (deletionInfo.deletedCount === 0) {
                    throw (`Could not recipe user with id of ${id}`)
                }
            });
        });
    },
    updateRecipe(id, updatedRecipe) {
        return this.getRecipeById(id).then((currentRecipe) => {
            let recipeUpdateInfo = {};
            if ('title' in updatedRecipe) {
                recipeUpdateInfo.title = updatedRecipe.title;
            }
            if ('ingredients' in updatedRecipe) {
                recipeUpdateInfo.ingredients = updatedRecipe.ingredients;
            }
            if ('steps' in updatedRecipe) {
                recipeUpdateInfo.steps = updatedRecipe.steps;
            }
            if ('comments' in updatedRecipe) {
                recipeUpdateInfo.comments = updatedRecipe.comments;
            }

            let updateCommand = {
                $set: recipeUpdateInfo
            };

            return recipes().then((recipeCollection) => {
                return recipeCollection.updateOne({ _id: id }, updateCommand).then(() => {
                    return this.getRecipeById(id);
                });
            });
        });
    },
    getAllCommentsByRecipeID(id) {
        return recipes().then((recipeCollection) => {
            return recipeCollection.findOne({ _id: id }).then((recipe) => {
                if (!recipe) throw "Recipe not found";
                let result = recipe.comments;
                result.forEach(function (e) {
                    e.recipeId = recipe._id;
                    e.recipeTitle = recipe.title;
                    return e;
                });
                return result;
            });
        });
    },
    getCommentByCommentID(id) {
        id = String(id);
        return recipes().then((recipeCollection) => {
            return recipeCollection.findOne({ $where: "this.comments._id = '" + id + "'" }).then((recipe) => {
                if (!recipe) throw "comment not found";
                let result = recipe.comments.filter(function (obj) {
                    return obj._id == id;
                })[0];
                if (!result) throw "comment not found";
                result.recipeId = recipe._id;
                result.recipeTitle = recipe.title;
                return result;
            });
        });
    },
    addComment(recipeId, newPoster, newComment) {
        return recipes().then((recipeCollection) => {
            commentID = uuid()
            let newCommentObject = {
                _id: commentID,
                poster: newPoster,
                comment: newComment
            };

            return recipeCollection.updateOne({ _id: recipeId }, { $push: { "comments": newCommentObject } }).then(function () {
                return exportedMethods.getCommentByCommentID(commentID).then((comment) => {
                    return comment;
                }, (error) => {
                    return Promise.reject("Can not add this comment");
                });
            });
        });
    },
    updateComment(recipeId, commentId, updatedComment) {
        return this.getCommentByCommentID(commentId).then((currentComment) => {
            if (!currentComment) throw "Comment not found";

            let commentUpdateInfo = currentComment;
            if ('poster' in updatedComment) {
                commentUpdateInfo.poster = updatedComment.poster;
            }
            if ('comment' in updatedComment) {
                commentUpdateInfo.comment = updatedComment.comment;
            }
            delete commentUpdateInfo.recipeId;
            delete commentUpdateInfo.recipeTitle;
            let updateCommand = {
                $set: { "comments.$": commentUpdateInfo }
            };
            return recipes().then((recipeCollection) => {
                return recipeCollection.updateOne({ "comments._id": commentId }, updateCommand).then((data) => {
                    return this.getCommentByCommentID(commentId);
                });
            });
        });
    },
    deleteComment(commentID) {
        return recipes().then((recipeCollection) => {
            return recipeCollection.updateOne(
                { "comments._id": commentID },
                { $unset: { "comments.$._id": commentID } }
            ).then((updationInfo) => {
                console.log("Hi");
                if (updationInfo.updatedCount === 0) {
                    throw (`Could not comment with id of ${commentID}`)
                }
            });
        });
    }
}
module.exports = exportedMethods;


//////                                                  TESTING                                          //////

/*  exportedMethods.addRecipe("Pizza", [
   {
     name: "Egg",
     amount: "2 eggs"
   },
   {
     name: "Olive Oil",
     amount: "2 tbsp"
   },
 ], [
   "First, heat a non-stick pan on medium-high until hot",
   "Add the oil to the pan and allow oil to warm; it is ready the oil immediately sizzles upon contact with a drop of water.",
   "Crack the egg and place the egg and yolk in a small prep bowl; do not crack the yolk!",
   "Gently pour the egg from the bowl onto the oil",    
   "Wait for egg white to turn bubbly and completely opaque (approx 2 min)",
   "Using a spatula, flip the egg onto its uncooked side until it is completely cooked (approx 2 min)",
   "Remove from oil and plate",
   "Repeat for second egg"
 ]).then((data) => {
     console.log(data);
 }); */
/*  exportedMethods.getAllRecipes().then((data) => {
    console.log(data);
});  */
/* exportedMethods.getRecipeById('2ca1bd64-88e3-4eb2-8b31-92148d57b3f8').then((data) => {
    console.log(data);
}) */
/*  exportedMethods.removeRecipe('edcd9b73-b0ce-4c47-a672-d0b1f42276a0').then(() => {
    console.log("Removed");
});   */
/* let data = {
    title: "Harsh J Pizza",
    steps: ['Harsh J', 'J Kevadia'],
    comments: [{
        _id: "9b527da1-67c0-4c13-ae99-3c1288ff2975",
        poster: "Gordan Ramsay",
        comment: "These eggs are delicious!"
    },
    {
        _id: "9b527da1-67c0-4c13-ae00-3d1288ff2975",
        poster: "Gordan Ramsay - 2",
        comment: "These eggs are not delicious!"
    }]
};
exportedMethods.updateRecipe('2ca1bd64-88e3-4eb2-8b31-92148d57b3f8', data).then((data) => {
    console.log(data);
}) */
/*  exportedMethods.getAllComments('2ca1bd64-88e3-4eb2-8b31-92148d57b3f8').then((comments) => {
    console.log(comments);
})   */
 /* exportedMethods.getCommentByCommentID('0effe67f-f54b-49cd-9ad7-2a7ad48a0056').then((data) => {
    console.log(data);
});  */
/* exportedMethods.addComment('efc7634f-bd73-4079-b36f-015989cacb80', "Manthan", "Kevadia Patel").then((data) => {
    console.log(data);
}) */
/* exportedMethods.updateComment('2ca1bd64-88e3-4eb2-8b31-92148d57b3f8', '514f9bd2-3fd7-4f2d-9fdc-7fc21132d016', { poster: "Harsh" })
    .then((data) => {
        console.log(data);
    });  */
/* exportedMethods.deleteComment('514f9bd2-3fd7-4f2d-9fdc-7fc21132d016').then(() => {
    exportedMethods.getCommentByCommentID('514f9bd2-3fd7-4f2d-9fdc-7fc21132d016').then((data) => {
        console.log(data);
    })
}); 
*/