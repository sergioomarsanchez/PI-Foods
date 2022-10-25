const { Router } = require('express');
const { Diet } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const arrDiets = [
    'Gluten Free',
    'Dairy Free',
    'Ketogenic',
    'Lacto Ovo Vegetarian',
    'Vegan',
    'Pescatarian',
    'Paleo',
    'Primal',
    'Low FODMAP',
    'Whole 30'
    ]

    
router.get('/', async(req, res, next)=>{

    try {
        let allDiets = await Diet.findAll()
        if (allDiets.length) return res.send(allDiets);
        else return res.send(await  Promise.all( arrDiets.map(async r=> await Diet.create({name: r}))));
       

   } catch (error) {
       next(error)
   }
})

// router.post('/', (req, res, next)=>{
//     res.send('estoy andando')
// })

// router.put('/', (req, res, next)=>{
//     res.send('estoy andando')
// })

// router.delete('/', (req, res, next)=>{
//     res.send('estoy andando')
// })

module.exports = router;
