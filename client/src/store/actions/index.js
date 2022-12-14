import axios from 'axios';
export const FETCH_RECIPES = 'FETCH_RECIPES';
export const POST_RECIPE = 'POST_RECIPE';
export const SORT = 'SORT';
export const FILTER_DIETS = 'FILTER_DIETS';
export const GET_DIETS = 'GET_DIETS';
export const SORT_BY_HS = 'SORT_BY:HS';
export const SEARCH_RECIPE = 'SEARCH_RECIPE';
export const GET_DETAIL = 'GET_DETAIL';
export const CLEAN_RECIPE = 'CLEAN_RECIPE';


export function fetchRecipes(){
        return function (dispatch){
        axios.get(`https://pi-food-backend-production.up.railway.app/api/recipes/`)
        .then((recipes)=>{
             dispatch({
                type:FETCH_RECIPES,
                payload:recipes.data
                })
            })
        .catch(e=>alert(e.response.data.msg))
    }
}

export function searchRecipeById(id){
        return function(dispatch){axios.get(`https://pi-food-backend-production.up.railway.app/api/recipes/${id}`)
        .then((recipe)=>{
            dispatch({
                type:SEARCH_RECIPE,
                payload:[recipe.data]
             })
        })
        .catch(e=>alert(e.response.data.msg));    
        
    }
} 

export function searchRecipe(name){
        return function (dispatch){
        axios.get(`https://pi-food-backend-production.up.railway.app/api/recipes?name=${name}`)
        .then((recipes)=>{
             dispatch({
                type:SEARCH_RECIPE,
                payload:recipes.data
                })
            })
            .catch(e=>alert(e.response.data.msg))
    }
} 

export function getDiets(){
    return function(dispatch){
        axios.get(`https://pi-food-backend-production.up.railway.app/api/diets`)
        .then((diets)=>{
            dispatch({
             type:GET_DIETS,
             payload:diets.data
             })
         })
        .catch(e=>alert(e.response.data.msg))    
    }

}

export function getDetail (id){

    return function(dispatch){axios.get(`https://pi-food-backend-production.up.railway.app/api/recipes/${id}`)
    .then((recipe)=>{
        dispatch({
            type:GET_DETAIL,
            payload:recipe.data
            })
    })
    .catch(e=>alert(e.response.data.msg));    
    
    }
}
export function postRecipe(payload){
    return async function(){
       const response =  await axios.post('https://pi-food-backend-production.up.railway.app/api/recipes', payload)
        return  await response;
    }
}

export function sort(order){
    return {
        type:SORT,
        payload:order
        }
    }

export function sortByHS(order){
    return {
        type:SORT_BY_HS,
        payload:order
        }
}    

export function filterDiet(dietType){
    return {
        type:FILTER_DIETS,
        payload:dietType
        }
    }


export function cleanRecipe(payload){
    return {
        type: CLEAN_RECIPE,
        payload
    }
}