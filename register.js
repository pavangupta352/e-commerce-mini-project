const express = require('express');
const Router = express.Router();
const table = require('./register_schema')
const hasher = require('bcrypt')
const mailer = require('./mailer')
Router.route('/').post(
    async(req, res) => {

        const x = Math.floor((Math.random() * 1000000) + 1);
        console.log(req.body)
            // save data to mongo db
        try {
            const data = new table({
                id: req.body.id,
                pass: await hasher.hash(req.body.pass, 10),
                email: req.body.email,
                otp: x,
                name: req.body.name
            })

            const link = '<a href="http://localhost:4000/register/verify?id=' + req.body.id + '&otp=' + x + '">Verify your mail</a>'

            console.log(link)
            const result = await data.save()
            mailer(req.body.email, link)
            if (result) {
                res.send("Sucess registration now verify your mail")
            }
        } catch (err) {
            console.log(err);
            res.send(err);
        }








    }
)
Router.route('/verify').get(
    async(req, res) => {

        const user = await table.find({ id: req.query.id })
        if (user[0].is_verified) {

            res.send("user already verified")
            return
        }
        if (req.query.otp == user[0].otp) {

            user[0].is_verified = true;
            user[0].otp = undefined;
            await user[0].save()
            console.log("verified")
            res.send("<center><h1>Sucessfully verified mail </h1></center>")
        } else {
            res.send("<center><h1>ERROR : Link not active , Try again !</h1></center>");
        }
    }
)

module.exports = Router;