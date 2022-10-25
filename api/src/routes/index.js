const { Router } = require('express');
const dietRoute = require('./Diets.js');
const recipeRoute = require('./Recipes.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/recipes', recipeRoute);
router.use('/diets', dietRoute);

router.get("/", (req, res)=>{
    res.send('Inicial Page')
})
module.exports = router;
