import { FETCH_RECIPES, SEARCH_RECIPE, SORT, FILTER_DIETS, GET_DIETS, SORT_BY_HS, POST_RECIPE, GET_DETAIL, CLEAN_RECIPE } from "../actions"

const initialState = {
    recipes : [],
    diets : [],
    filteredRecipes: [],
    recipe : {}
}

export default function reducer(state = initialState, action){
    switch(action.type){
        case FETCH_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                filteredRecipes : action.payload
             }

        case SEARCH_RECIPE:
            return {
                ...state,
                filteredRecipes: action.payload
            }

        case SORT:
            let orderedRecipes = [...state.filteredRecipes]

            orderedRecipes = orderedRecipes.sort((a, b)=>{
                if(a.name < b.name){
                    return action.payload === 'ascendente'? -1 : 1;
                } 
                if(a.name > b.name){
                    return action.payload === 'ascendente'? 1 : -1;
                }
                return 0
            })
            return {
                ...state,
                filteredRecipes: orderedRecipes
            }  

        case SORT_BY_HS:
            let orderedRecipesByHS = [...state.filteredRecipes]
    
            orderedRecipesByHS = orderedRecipesByHS.sort((a, b)=>{
                 if(a.healthScore < b.healthScore){
                     return action.payload === 'ascendente'? -1 : 1;
                  } 
                  if(a.healthScore > b.healthScore){
                   return action.payload === 'ascendente'? 1 : -1;
                 }
                   return 0
                })
                return {
                    ...state,
                    filteredRecipes: orderedRecipesByHS
                } 

        case FILTER_DIETS:
            if(action.payload==='sin filtro'){
                return {
                    ...state,
                    filteredRecipes: []
                }
            }
            
            let filteredRecipes = [...state.recipes]
            filteredRecipes = filteredRecipes.filter(r =>{
                if(r.id.length>6){
                    return r.diets.map(d=>d.name.toLowerCase()).includes(action.payload.toLowerCase())
                }
             return r.diets.includes(action.payload.toLowerCase())
            })
           
            return {
                ...state,
                filteredRecipes: filteredRecipes
            }
        case GET_DIETS:
            return {
                ...state,
                diets: action.payload
            }     
        case POST_RECIPE:
            return {
                ...state,
            }      
        case GET_DETAIL:
            return {
                ...state,
                recipe: action.payload
            }
        case CLEAN_RECIPE:
            return {
                ...state,
                recipe: []
            }
        default:
             return state
        }
    }