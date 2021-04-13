const { response } = require('express');
const Category = require('../models/category.model');
const Product = require('../models/product.model');

const show = async(req, res, next) => {
    await Category.findAll({ include: [{ model: Product, as: "products" }] })
        .then(cate => {
            res.json(cate);
        })
        .catch(next);
}

const create = async(req, res, next) => {
    Category.create({
            cateName: req.body.cateName,
        })
        .then(category => { res.json(category) })
        .catch(next);
}

const edit = async(req, res, next) => {
    await Category.findOne({ where: { id: req.params.id } })
        .then(category => { return res.json({ category }) })
        .catch(next)
}

const update = async(req, res, next) => {
    const { cateName } = req.body;
    await Category.update({ cateName: cateName }, { where: { id: req.params.id } })
        .then(() => {
            res.send("Data was Updated");
        })
        .catch((err) => {
            console.log("Error : ", err)
        });
}

const deleted = async(req, res, next) => {
    try {
        const Category = await Category.findOne({ where: { id: req.params.id } })

        await Category.destroy()

        return res.json({ message: 'Category deleted!' })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })

    }
}

module.exports = { show, create, edit, update, deleted };