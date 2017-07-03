/******************************************
 *  Author : Harsh Jagdishbhai Kevadia   
 *  Created On : Mon Jul 03 2017
 *  File : harsh.js
 *******************************************/
let about = {
    name: "Harsh Kevadia",
    biography: "Harsh Jagdishbhai Kevadia is born in Surat, India. He belongs to middle class family. He has a natural interest in technology while he was in class 1. \nHe completed his Bachelor degree from Gujarat Technological University with Computer Engineering major. He is very good programmer and ingenious software engineer. He did many freelancing projects, while he studying \nCurrently, He is doing graduate study from Stevens Institute of Technology, Hoboken, NJ with Computer Science major.",
    favoriteShows: ["Robot", "Narcos", "Fringe", "House of Cards", "Game of Throne", "Friends"],
    hobbies: ["Swimming", "Programming", "Reading", "Travelling", "Biking"]
};
let story = {
    storyTitle: "True Wealth",
    story: "Once upon a time, there lived a very rich and wealthy man in a big town. He led a luxurious life. He always boasted about his wealth to his friends and relatives.\nHis son was studying in a distant city and he returned home for vacation. The rich man wanted to show off to his son how rich he was. But his son wasn’t fond of any luxurious lifestyle. However, the rich man wanted to make his son realize that his lifestyle was extremely rich and that poor people suffered a lot. He planned a day’s visit to the entire town to show him the life of the poor people.\nThe father and the son took a chariot and visited the entire town. They returned home after two days. The father was happy that his son was very quiet after seeing the poor people honouring the rich man and after witnessing the sufferings of the poor due to lack of facilities.\nThe rich man asked his son, “Dear boy, how was the trip? Have you enjoyed it?”\n“Yes my dad, it was a great trip with you,” the son replied.\n“So, what did you learn from the trip?” the father asked.\nThe son was silent. \n “Finally you have realized how the poor suffer and how they actually live,” said the father.\n“Finally you have realized how the poor suffer and how they actually live,” said the father.\n“No father,” replied the son. He added, “We have only two dogs, they have 10 dogs. We have a big pool in our garden, but they have a massive bay without any end! We have luxurious and expensive lights imported from various countries, but they have countless stars lighting their nights. We have a house on a small piece of land, but they have abundant fields that go beyond the horizon. We are protected by huge and strong walls around our property, but they bond with each other and surround themselves with their fellow beings. We have to buy food from them, but they are so rich that they can cultivate their own food.”\nThe rich father was stunned and speechless, on hearing his son’s words.\nFinally the son added, “Dad, thank you so much for showing me who is rich and who is poor. Thank you for letting me understand how poor we really are!”\nTrue wealth is not measured by money and property! True wealth is created in good friendships and compassionate relationships."
};
let education = [
    {
        schoolName: "Stevens Institute of Technology",
        degree: "Master of Science in Computer Science",
        favoriteClass: "My Favorite class is CS 600 - Advance Algorithm Design and Implementation and CS 549 - Distributed Systems and Cloud Computing",
        favoriteMemory: "Memorial Day: Did not sleep 2 days to complete Assignment 5 - Hadoop in CS 549"
    },
    {
        schoolName: "Gujarat Technological University",
        degree: "Bachelor of Engineering in Computer Engineering",
        favoriteClass: "My Favorite class is Artificial Intelligence",
        favoriteMemory: "Memorial Day: National News Paper recognize our project as innovative project"
    }
];
let exportedMethods = {
    getAbout() {
        return about;
    },
    getEducation() {
        return education;
    },
    getMyStory() {
        return story;
    }
};

module.exports = exportedMethods;