const Comment = require('../models/Comment')
const Auto = require('../models/Auto')
const User = require('../models/User')
const requireLogin = require('..//middlewares/requireLogin')
const requireCredits = require('..//middlewares/requireCredits')

module.exports = app => {

    //ok
    app.get('/api/autos/:id', (req, res) => {
        Auto.findById({_id: req.params.id}, (err, auto) => {
            if (err) return err

            res.send(auto)
        })
    })

    //ok
    app.get('/api/autos', (req, res) => {
        Auto.find((err, autos) => {
            if (err) return console.error(err);
            res.send(autos)
        })
    })

    //tesztelni kell - nem műkszik
    app.post('/api/autos/comments', async (req, res) => {
        const userId = req.body.userId
        const autoId = req.body.autoId
        const userName = req.body.userName
        const userText = req.body.userText
        console.log(reqComment)

        const comment = new Comment()
        comment.user = userName
        comment.text = userText
        comment.save((err, newComment) => {
            if (err) return err

            Auto.findById({_id: autoId}, (err, auto) => {
                if (err) return err

                auto._comments.push(newComment._id)
                auto.save(err => {
                    if (err) return err

                    res.send(auto)
                })
            })
        })
    })

    app.post('/api/autos', requireLogin, requireCredits, async (req, res) => {

        const auto = new Auto();
        auto.marka = req.body.marka
        auto.modell = req.body.modell
        auto.kep = req.body.kep
        auto.ar = req.body.ar
        auto.ev = req.body.ev
        auto.allapot = req.body.allapot
        auto.kivitel = req.body.kivitel
        auto.km = req.body.km
        auto.szin = req.body.szin
        auto.tomeg = req.body.tomeg
        auto.uzemanyag = req.body.uzemanyag
        auto.hengerUrTartalom = req.body.hengerUrTartalom
        auto.teljesitmeny = req.body.teljesitmeny
        auto.hajtas = req.body.hajtas
        auto.valto = req.body.valto
        auto.leiras = req.body.leiras

        await auto.save(async (err, auto) => {
            if (err) return err

            req.user.credits -= 1
            req.user._autos.push(auto._id)
            await req.user.save((err, user) => {
                if (err) return err
            })

            res.send(auto)
        })
    })

    //működik
    app.put('/api/autos/likes', requireLogin, (req, res) => {
        const id = req.body.id
        Auto.findById({_id: id}, (err, auto) => {
            if (err) return err

            auto.likes = auto.likes + 1
            auto.save((err, updatedAuto) => {
                if (err) return err

                res.send(updatedAuto)
            })
        })
    })

    //működik
    app.put('/api/autos/edit', requireLogin, (req, res) => {
        const id = req.body.id

        Auto.findById({_id: id}, (err, auto) => {
            if (err) return err

            auto.marka = req.body.marka
            auto.modell = req.body.modell
            auto.kep = req.body.kep
            auto.ar = req.body.ar
            auto.ev = req.body.ev
            auto.allapot = req.body.allapot
            auto.kivitel = req.body.kivitel
            auto.km = req.body.km
            auto.szin = req.body.szin
            auto.tomeg = req.body.tomeg
            auto.uzemanyag = req.body.uzemanyag
            auto.hengerUrTartalom = req.body.hengerUrTartalom
            auto.teljesitmeny = req.body.teljesitmeny
            auto.hajtas = req.body.hajtas
            auto.valto = req.body.valto
            auto.leiras = req.body.leiras

            auto.save((err, updatedAuto) => {
                if (err) return err

                res.send(updatedAuto)
            })
        })
    })

    //működik
    app.delete('/api/autos/delete', requireLogin, (req, res) => {
        const id = req.body.id

        Auto.findById({_id: id}, (err, auto) => {
            if (err) return err

            Auto.remove({_id: id}, (err) => {
                if (err) return err
                res.send("success")
            })
        })
    })
}