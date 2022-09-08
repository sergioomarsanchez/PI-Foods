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
      return res.status(200).json(getAll)
 }});

 //get por id
 router.get('/:idRecipe', async (req, res, next)=>{
    const { idRecipe } = req.params;

    if(idRecipe.includes('-')){
       const idFound = await Recipe.findByPk(idRecipe, { include : Diet })
        return idFound 
               ? res.json(idFound)
               : res.status(404).send({ msg: 'Receta no encontrada'})
    } else{
        try {
            const recetaApi = await getIdFromApi(idRecipe)
            return recetaApi 
                   ? res.json(recetaApi)
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
    if(!name || !summary || !diets || !healthScore || !steps) return res.status(404).send({ msg: 'Faltan datos para crear la Receta' });
    const newRecipe = await Recipe.create({
          name,
          summary,
          healthScore: parseFloat(healthScore),
          steps
      })
      
    if(newRecipe){
     
        for (let i = 0 ; i< diets.length; i++){
          let diet=  await Diet.findAll({
              where:{
                  name:diets[i]==='fodmap friendly'
                  ? 'Low FODMAP'
                  : diets[i] === 'paleolithic'
                  ? 'Paleo'
                  : diets[i]=== 'lacto ovo vegetarian'
                  ? 'Lacto Ovo Vegetarian'
                  : diets[i] === 'dairy free'
                  ? 'Dairy Free'
                  : diets[i] === 'gluten free'
                  ? 'Gluten Free'
                  : diets[i].charAt(0).toUpperCase() + diets[i].slice(1)
              }
          })
          if(diet){
            newRecipe.addDiets(diet)
        }else { return res.status(404).send({ msg: 'Tipo de dieta inexistente' })
    }
}
return res.send('success')

      
  } }catch (error) {
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
