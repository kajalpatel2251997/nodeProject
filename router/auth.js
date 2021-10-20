// const { request } = require('express');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

require('../db/conn')
const User = require("../screma/userscrema")


// get api (used to get data/info from server)
router.get("/getData: {id}", (req, res) => {

    res.send("home page from router")
    console.log("home page from router")
})

// post api (used to create data on server)
// router.post("/register", (req, res) => {
//     const { name, email, work, phone, password } = req.body;

//     if (!name || !email || !phone || !work || !password) {
//         return res.status(422).json({ error: "Plz fill the field properly" })
//     }

//     User.findOne({ email: email }).then((userExist) => {
//         if (userExist) {
//             return res.status(422).json({ error: "Email already exist" })
//         }

//         const user = new User({ name, email, phone, work, password })

//         user.save().then(() => {
//             res.status(201).json({ message: "user registered successfully" })
//         }).catch((error) => {
//             console.log(error)
//         })
//     })

// })


// register api using async await

router.post("/register", async (req, res) => {
    console.log(req.body)
    const { name, email, phone, work, password } = req.body

    if (!name || !work || !email || !phone || !password) {
        return res.status(422).json({ error: "Plz fill the field properly" })
    }

    try {
        const userExist = await User.findOne({ email: email })
        console.log(userExist)

        if (userExist) {
            return res.status(422).json({ error: "email already exited" });
        }

        const user = new User({ name, email, phone, work, password });
        console.log(user)
        await user.save();
        return res.status(201).json({ massage: "user register successfully" })

    } catch (error) {
        console.log(error)
    }
})

// Sign in api using async await

router.post("/singin", async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(422).json({ error: "Plz fill the data properly " })

        }

        const userExist = await User.findOne({ email: email })
        console.log(userExist);
        if (!userExist) {
            return res.status(400).json({ error: "email or password is invalid" })
        } 

        const isMatch = await bcrypt.compare(password, userExist.password);
        const token = await userExist.generateAuthToken();
        console.log(token);
        console.log(isMatch);
        res.cookie('jwtoken', token, {
            expires: new Date(Date.now() +30000000000)
        })

        if(!isMatch) {
           return res.status(400).json({error: "email or password is incorrect"})
        }
            return res.status(200).json({ message: "you have signed in successfully" })
        
    }
    catch (error) {
        console.log(error)
    }
})

// export method is used to export the module from current file
module.exports = router