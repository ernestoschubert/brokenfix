const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userControllers = {
    addUser: async (req, res) => {
        console.log(req.body)
        let { password, email, street, commune, number, workers, admin, phoneNumber, img, lastName, name, google } = req.body
        try {
            const userExists = await User.findOne({ email })
            if (userExists) {
                res.json({ success: false, error: "El email ya esta en uso", response: null })
            } else {
                const hashPass = bcryptjs.hashSync(password, 10)
                const newUser = new User({
                    password: hashPass,
                    street,
                    commune,
                    number,
                    workers,
                    admin,
                    phoneNumber,
                    lastName,
                    name,
                    email,
                    google
                })
                await newUser.save()
                const token = jwt.sign({ ...newUser }, process.env.SECRETKEY)
                const { _id } = newUser
                res.json({ success: true, response: { name, img, token, _id, admin }, error: null })
            }
        } catch (error) {
            console.log(error);
            res.json({ success: false, response: null, error: error })
        }
    },
    signin: async (req, res) => {
        const {email, password, google} = req.body 
        console.log(req.body)
        try {
            const user = await User.findOne({email})
            if (!user) throw new Error ("Email or password incorrect");
            if (user.googleAccount && !google) throw new Error ("Invalid email");
            const isPassword = bcryptjs.compareSync(password, user.password);
            if (!isPassword) throw new Error ("Email or password incorrect");
            const token = jwt.sign({...user}, process.env.SECRETKEY)
            res.json({success: true, response:{token, name: user.name, img: user.img, lastName: user.lastName, _id: user._id}})
        } catch (error) {
            res.json({success: false, response: error.message})
        }
    },
    authUser: (req, res) => {
        try {
            const userAuth = req.user
            res.json({ success: true, response: userAuth, error: null })
        } catch (error) {
            res.json({ success: false, response: null, error: error })
        }
    },
    getUsers: async (req, res) => {
        try {
            if (req.user.admin) {
                const users = await User.find()
                res.json({ success: true, users })
            } else {
                res.json({ success: false, error: 'Unauthorized User, you must be an admin' })
            }
        } catch (error) {
            res.json({ success: false, response: null, error: error })
        }
    },
    updateUser: async (req, res) => {
        const id = req.params.id
        const userBody = req.body
        let userUpdated
        try {
            if (req.user.admin) {
                userUpdated = await User.findOneAndUpdate({ _id: id }, userBody, { new: true })
                res.json({ success: true, userUpdated })
            } else {
                res.json({ success: false, error: 'Unauthorized User, you must be an admin' })

            }
        } catch (error) {
            res.json({ success: false, response: null, error: error })
        }
    },
    deleteUser: async (req, res) => {
        const id = req.params.id
        try {
            if (req.user.admin) {
                await User.findOneAndDelete({ _id: id })
                res.json({ success: true, msg: 'User was deleted sccessfully' })
            } else {
                res.json({ success: false, error: 'Unauthorized User, you must be an admin' })
            }
        } catch (error) {
            res.json({ success: false, response: null, error: error })
        }
    },
}
module.exports = userControllers
