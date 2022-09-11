const axios = require('axios').default;
const { Recipe, Diet } = require('../db');
const { ApiKeys } = require('../apiKeys.js'); //estoy usando diferentes api keys de manera random
// Traigo la data de la api:
const dbData = async () => {
    try {
        const data = await Recipe.findAll({
            include: {
              model: Diet,
              attributes: ["name"],
              through: { attributes: [] }
            },
        });
        return data;   
    } catch (error) {
        return error
    }
}

// obtengo las primeras 100 recetas de la api
const getApi = async () => {
    try {
        const api = await axios.get(
            `https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&apiKey=${ApiKeys()}`
        )
        const data = await api.data.results.map(r=>{
            return {
                id: r.id,
                name: r.title,
                diets: r.diets,
                image: r.image,
                type: r.dishTypes,
                healthScore: r.healthScore
            };
        });
    
        return data;
        
    } catch (error) {
        return error
    }
};

//junto ambos datos
const allData = async () => {
    try {
        const apiInfo = await getApi();
        const dbInfo = await dbData();
        const totalData = [...apiInfo, ...dbInfo];
   
        return totalData;
    }
 catch (error) {
       return error
    };
};

// llamo a la api con un pedido de ID
const getIdFromApi = async(idNum)=>{
    try {
        const recipe = await axios.get(
            `https://api.spoonacular.com/recipes/${idNum}/information?apiKey=${ApiKeys()}`
        )
        const {
            id,
            title,
            image,
            dishTypes,
            diets,
            summary,
            spoonacularScore,
            healthScore,
            instructions,
        } = await recipe.data; 
        const recipeFound = {
            id,
            name: title,
            image,
            type: dishTypes,
            diets,
            summary,
            score: spoonacularScore,
            healthScore,
            steps : instructions
        };
    
        return recipeFound
        
    } catch (error) {
        return error
    }
}

module.exports = { allData, getIdFromApi };