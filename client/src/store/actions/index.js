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


export function fetchRecipes(nameOrID){
    if(!nameOrID){
        return function (dispatch){
        axios.get(`http://localhost:3001/api/recipes/`)
        .then((recipes)=>{
             dispatch({
                type:FETCH_RECIPES,
                payload:recipes.data
                })
            })
        .catch(e=>console.log(e))
    }
} else if(typeof Number(nameOrID) === 'number' || nameOrID.includes('-')){
        return function(dispatch){axios.get(`http://localhost:3001/api/recipes/${nameOrID}`)
        .then((recipe)=>{
            dispatch({
                type:FETCH_RECIPES,
                payload:[recipe.data]
             })
        })
        .catch(e=>console.log(e));    
        
    }
} else if(nameOrID){
        return function (dispatch){
        axios.get(`http://localhost:3001/api/recipes?name=${nameOrID}`)
        .then((recipes)=>{
             dispatch({
                type:FETCH_RECIPES,
                payload:recipes.data
                })
            })
            .catch(e=>console.log(e))
    }
    } 
}

export function getDiets(){
    return function(dispatch){
        axios.get(`http://localhost:3001/api/diets`)
        .then((diets)=>{
            dispatch({
             type:GET_DIETS,
             payload:diets.data
             })
         })
        .catch(e=>console.log(e))    
    }

}

export function getDetail (id){

    return function(dispatch){axios.get(`http://localhost:3001/api/recipes/${id}`)
    .then((recipe)=>{
        dispatch({
            type:GET_DETAIL,
            payload:recipe.data
            })
    })
    .catch(e=>console.log(e));    
    
    }
}
export function postRecipe(payload){
    return async function(dispatch){
       const response =  await axios.post('http://localhost:3001/api/recipes', payload)
        console.log( await response)
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