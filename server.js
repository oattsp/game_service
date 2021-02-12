const express = require('express')
const cors = require('cors')
const app = express()
const db = require('./models')
require('dotenv').config()

app.use(express.json())
app.use(cors())

const ADMIN_USER = process.env.ADMIN_USER
const SECRET = process.env.SECRET

const ExtractJwt = require('passport-jwt').ExtractJwt
const JwtStrategy = require('passport-jwt').Strategy
const jwtOptions = {
   jwtFromRequest: ExtractJwt.fromHeader('authorization'),
   secretOrKey: SECRET,
}
const jwtAuth = new JwtStrategy(jwtOptions, (payload, done) => {
   if(payload.sub === ADMIN_USER) {
        done(null, true)
   }
   else {
        done(null, false)
   }
})

const passport = require('passport')
passport.use(jwtAuth)

const requireJWTAuth = passport.authenticate('jwt',{session:false})

app.get('/game', async (req, res) => {
    try {
        const result = await db.Games.findAll({
            order: [
                ["id","DESC"]
            ]
        })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.get('/game/:id', requireJWTAuth, async (req, res) => {
    try {
        const result = await db.Games.findOne({
            where: {'id': req.params.id}
        })
        if (result) {
            res.status(200).json(result)  
        } else {
            res.status(404).json({
                message: 'game not found!!'
            })  
        }
    } catch (error) {      
        res.status(500).json({
            message: error.message
        })   
    }
})

app.post('/game', requireJWTAuth, async (req, res) => {
    try {
        const game = await db.Games.create(req.body)
        res.status(201).json(game)  
    } catch (error) {      
        res.status(500).json({
            message: error.message
        })   
    }
})

app.put('/game/:id', requireJWTAuth, async (req, res) => {
    try {
        const result = await db.Games.findOne({
            where: {'id': req.params.id}
        })
        if (!result) {
            return res.status(404).json({
                message: 'game not found!!'
            })
        }

        const game = await db.Games.update(req.body, {
            where: {'id': result.id}
        })

        if ([game]) {
            const updateGame = await db.Games.findByPk(result.id)
            res.status(200).json(updateGame)  
        } else {
            throw new Error('update game failure!!')
        }
    } catch (error) {      
        res.status(500).json({
            message: error.message
        })   
    }
})

app.put('/game/code/:code_game', requireJWTAuth, async (req, res) => {
    try {
        const result = await db.Games.findOne({
            where: {'code_game': req.params.code_game}
        })
        if (!result) {
            return res.status(404).json({
                message: 'game not found!!'
            })
        }

        const game = await db.Games.update(req.body, {
            where: {'id': result.id}
        })

        if ([game]) {
            const updateGame = await db.Games.findByPk(result.id)
            res.status(200).json(updateGame)  
        } else {
            throw new Error('update game failure!!')
        }
    } catch (error) {      
        res.status(500).json({
            message: error.message
        })   
    }
})
 
app.delete('/game/:id', requireJWTAuth, async (req, res) => {
    try {
        const deleted = await db.Games.destroy({
            where: {'id': req.params.id}
        })
        if (deleted) {
            res.status(204).json({
                message: 'game deleted'
            })  
        } else {
            res.status(404).json({
                message: 'game not found!!'
            })  
        }
    } catch (error) {      
        res.status(500).json({
            message: error.message
        })   
    }
})

const PORT = process.env.PORT || 3000
const ENV = process.env.NODE_ENV || 'development'
app.listen(PORT, ()=>{
    console.log(`on PORT: ${PORT}`)
    console.log(`on ENV: ${ENV}`)
    console.log('game service is running')
})