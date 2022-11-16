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
    const currentRecipes = filteredRecipes?.slice(indexOfFirstRecipe, indexOfLastRecipe)
    
    const [isVisible, setIsVisible] = useState(0)

    const toggleVisibility = ()=>{
      if(window.scrollY > 300){
        setIsVisible(100)
      } else {
        setIsVisible(0)
      }
    }
  
    const scrollToTop = ()=>{
      window.scrollTo({
        top:0,
        behavior:"smooth"
      })
    }
  
    useEffect(() => {
      window.addEventListener('scroll', toggleVisibility)
      return () =>{
        window.removeEventListener('scroll', toggleVisibility)
      }
    }, [])

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

          <div className={style.cardsContainer}>
                {recipes.length?currentRecipes?.map((recipe)=>{
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
                }):<div className={style.loaderContainer}> <span className={style.loader}></span></div>
            }

                </div>
                <button id={style.toTop} onClick={scrollToTop} style={{opacity: isVisible}} className={style.noselect}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z"/></svg></button>
                
                
    </div>
    )
}