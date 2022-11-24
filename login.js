const express = require('express');
const Router = express.Router();
const table = require('./register_schema')
const hasher = require('bcrypt')
const getuser = require('./get_user')
Router.route('/').post(
    async(req, res) => {

        if (req.session.uid) {
            res.send('user already logged in')
            return
        }

        console.log(req.body.id)
        if (req.body.id != "") {
            console.log('login request')
            const ress = await table.find({ id: req.body.id }) // returns array 
            if (ress[0] == undefined) {
                res.send("User does not exist")
                return
            }
            const response = await hasher.compare(req.body.pass, ress[0].pass)

            response ? req.session.uid = req.body.id + ress[0].pass : 1
            if (response) {
                if (ress[0].is_verified == false) {
                    res.send("Plz verify your mail first")
                    return
                }
            }
            console.log(response ? "Login sucess ! " : "Fake password !")
            res.send(response ? "sucess" : "fake")
            return
        }
        res.send("id is empty")

    }


)
Router.route('/if').get((req, res) => {
    console.log(getuser(req.session.uid))
    if (req.session.uid) {
        res.send("logged")
    } else {
        res.send("do")
    }
})

module.exports = Router;