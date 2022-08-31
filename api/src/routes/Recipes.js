const { Router } = require('express');
const { Recipe, Diet } = require('../db');
const { allData, getIdFromApi } = require('./utilities.js')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// get que en caso de recibir name por query trae las recetas que incluya ese name y sino trae 100 + lo de database
 router.get('/', async (req, res, next)=>{
     const getAll = await allData()
     const {name} = req.query

     if(!Array.isArray(getAll)) {return res.send({ msg: `Error : ${getAll}`});
    } else if(name && typeof name === 'string'){ 
            const result = getAll.filter(r=> r.name.toLowerCase().includes(name.toLocaleLowerCase()))
       
            result.length 
            ? res.status(200).json(result)
            : res.status(404).send({ msg : 'Receta no encontrada'})
            
        } else {
      return res.status(200).send(getAll)
 }});

 //get por id
 router.get('/:idRecipe', async (req, res, next)=>{
    const { idRecipe } = req.params;

    if(idRecipe.includes('-')){
       const idFound = await Recipe.findByPk(idRecipe, { include : Diet })
        return idFound 
               ? res.send(idFound)
               : res.status(404).send({ msg: 'Receta no encontrada'})
    } else{
        try {
            const recetaApi = await getIdFromApi(idRecipe)
            return recetaApi 
                   ? res.send(recetaApi)
                   : res.status(404).send({ msg: 'Receta no encontrada'})
        } catch (error) {
            next(error)
        }
    }
 })

 //post a la db

router.post('/', async(req, res, next)=>{
  try {
    const { name, summary, diets, healthScore, steps } = req.body
    
    const newRecipe = await Recipe.create({
          name,
          summary,
          healthScore: parseFloat(healthScore),
          steps
      })
    if(newRecipe){
        await newRecipe.setDiets(await Diet.create({
            name: diets
        })) 
         res.send('success')
        } else
        return res.status(404).send({ msg: 'Dieta no agregada' })
      
  } catch (error) {
     next(error)
  }

})



router.put('/', (req, res, next)=>{
    res.send('estoy andando')
})

router.delete('/', (req, res, next)=>{
    res.send('estoy andando')
})

module.exports = router;
