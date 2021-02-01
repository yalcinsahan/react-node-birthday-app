import { v4 as uuidv4 } from 'uuid';
import express from 'express'
const userRouter = express.Router()
import User from '../models/User.js'

//get all friends 
userRouter.post("/allfriends", (req, res) => {
    User.findOne({ code: req.body.code }).then((result) => {
        if (result) res.send(result.friends)
        else res.status(404).send({ message: "üye bulunamadı" })
    }).catch((err) => {
        console.log("arkadaşları alırken oluşan hata mesajı: ", err);
    })
})

//add new user
userRouter.post("/newuser", (req, res) => {
    User.create({ code: uuidv4() }).then((result) => {
        res.send(result);
    }).catch((err) => console.log("yeni user hatası: ", err))
});

//add new friend
userRouter.put("/addfriend", (req, res) => {
    User.findOne({ code: req.body.code }, (err, result) => {

        if (err) return console.log("bir hata oluştu")

        let templateArray = result.friends;
        templateArray.push(req.body.newFriend)

        User.findOneAndUpdate({ code: req.body.code }, {
            friends: templateArray
        }, (error, updatedResult) => {

            if (error) log("arkadaş eklerken bir hata oluştu")
            else res.send(updatedResult)
        })
    })
})


export default userRouter




