/******************************************
 *  Author : Harsh Jagdishbhai Kevadia   
 *  Created On : Fri Jul 21 2017
 *  File : users.js
 *******************************************/
const data = [
    {
        _id: "9253921193",
        username: "masterdetective123",
        hashedPassword: "$2a$06$WzG/OqlZ9fn1WoA6t/a5i.PoLIPlL1QZXztH6vjWqrK.Px2YevXya",
        firstName: "Sherlock",
        lastName: "Holmes",
        profession: "Detective",
        bio: "Sherlock Holmes (/ˈʃɜːrlɒk ˈhoʊmz/) is a fictional private detective created by British author Sir Arthur Conan Doyle. Known as a 'consulting detective' in the stories, Holmes is known for a proficiency with observation, forensic science, and logical reasoning that borders on the fantastic, which he employs when investigating cases for a wide variety of clients, including Scotland Yard."
    },
    {
        _id: "3490207751",
        username: "lemon",
        hashedPassword: "$2a$06$CUFoFuuK8tEmOE/euVeMpuHpeFytLJ53mexHXGSk6Z4G5M.1o7gKm",
        firstName: "Elizabeth",
        lastName: "Lemon",
        profession: "Writer",
        bio: "Elizabeth Miervaldis 'Liz' Lemon is the main character of the American television series 30 Rock. She created and writes for the fictional comedy-sketch show The Girlie Show or TGS with Tracy Jordan."
    },
    {
        _id: "4985079561",
        username: "theboywholived",
        hashedPassword: "$2a$06$hxdyX7Scyjgw9x197hp2DOxf6wFiWD0qSmqe.kjJ2/6PJ0092Tzcu",
        firstName: "Harry",
        lastName: "Potter",
        profession: "Student",
        bio: "Harry Potter is a series of fantasy novels written by British author J. K. Rowling. The novels chronicle the life of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry . The main story arc concerns Harry's struggle against Lord Voldemort, a dark wizard who intends to become immortal, overthrow the wizard governing body known as the Ministry of Magic, and subjugate all wizards and Muggles."
    }
];
let exportedMethods = {
    findUserByUsername(username) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].username === username) {
                return data[i]._id;
            }
        }
        return -999;
    },
    getUserInfoByID(id) {
        for (let i = 0; i < data.length; i++) {
            if (data[i]._id === id) {
                return data[i];
            }
        }
        return -999;
    }
};

module.exports = exportedMethods;