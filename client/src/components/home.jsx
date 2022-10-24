import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchRecipes, filterDiet } from "../store/actions";
import RecipeCard from "./recipeCard.jsx";
import SearchBar from './searchBar';
import FilterDiet from './filterDiet';
import Order from './order';
import OrderByHS from './orderByHS';
import Paginado from './paginado';
import style from '../styleSheets/home.module.css';
import { Link } from "react-router-dom";


export default function Home(){
    let recipes = useSelector((state)=>state.recipes);
    let filteredRecipes = useSelector((state)=>state.filteredRecipes);
    const [currentPage, setCurrentPage]= useState(1);
    const [recipesPerPage, setRecipesPerPage]= useState(9);
    const indexOfLastRecipe = currentPage * recipesPerPage
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
    const currentRecipes = filteredRecipes.length? filteredRecipes?.slice(indexOfFirstRecipe, indexOfLastRecipe)
                                          : recipes?.slice(indexOfFirstRecipe, indexOfLastRecipe)
    let dispatch = useDispatch()

    const paginado = function (pageNumber){
        setCurrentPage(pageNumber)
    }

    const refreshPage =()=>{
        window.location.reload(false)
    }
    function handleClick(e){
        e.preventDefault()
        dispatch(filterDiet('No filter'))
        refreshPage()
    }

    useEffect(() => {
        setCurrentPage(1)
    }, [filteredRecipes])

    useEffect(() => {
        if(!recipes.length)dispatch(fetchRecipes())
    }, [])
     return( <div className={style.homeContainer}>
          <Link to='/addRecipe' ><button className={style.button}>Create your Recipe!</button></Link>
         <nav className={style.navContainer}>
          <Order/>
          <OrderByHS/>
          <FilterDiet/>
          <SearchBar/>
          </nav>
          <button className={style.button} onClick={handleClick} >
            Reset Recipes
          </button>
          <Paginado 
          recipesPerPage={recipesPerPage}
          recipes={filteredRecipes.length? filteredRecipes.length : recipes.length}
          setCurrentPage={paginado}
          currentPage={currentPage}/>

                {currentRecipes.length?
          <div className={style.cardsContainer}>
                {currentRecipes?.map((recipe)=>{
                    if(recipe.id.length > 6){
                        return <RecipeCard id={recipe.id}
                        name={recipe.name}
                        diets={recipe.diets.map(d=>d.name.toLowerCase())}
                        image= 'https://i.pinimg.com/736x/7c/30/0d/7c300d26bc4a08e1cd78828a16c5ccca.jpg'
                        type={['']}
                        healthScore={recipe.healthScore}/>
                    }else
                    return <RecipeCard id={recipe.id}
                    name={recipe.name}
                    diets={recipe.diets}
                    image={recipe.image} 
                    type={recipe.type}
                    healthScore={recipe.healthScore}/>
                })}
                </div>
                :<span className="loader"></span>
                }
    </div>
    )
}