const { response } = require('express');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const { findOne } = require('../models/user.model');

const show = async(req, res, next) => {
    await User.findAll()
        .then(user => {
            res.json(user);
        })
        .catch(next);
}

const create = async(req, res, next) => {
    const UserWithEmail = User.findOne({ where: { email: req.body.email } });
    if (!UserWithEmail) {
        return res.send("Email đã tồn tại!");
    }
    const password = await bcrypt.hash(req.body.password, 10)
    User.create({
            username: req.body.username,
            email: req.body.email,
            password: password,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            birthday: req.body.birthday,
            sex: req.body.sex
        })
        .then(user => { res.json(user) })
        .catch(next);
}

const edit = async(req, res, next) => {
    await User.findOne({ where: { id: req.params.id } })
        .then(user => { return res.json({ user }) })
        .catch(next)
}

const update = async(req, res, next) => {
    const { username, phoneNumber, email, birthday, sex, address } = req.body;
    const password = await bcrypt.hash(req.body.password, 10)
    User.update({ username: username, email: email, phoneNumber: phoneNumber, address: address, birthday: birthday, sex: sex, password: password }, { where: { id: req.params.id } })
        .then(() => {
            res.send("Data was Updated");
        })
        .catch((err) => {
            console.log("Error : ", err)
        });
}

const deleted = async(req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.params.id } })

        await user.destroy()

        return res.json({ message: 'User deleted!' })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })

    }
}

module.exports = { show, create, edit, update, deleted };