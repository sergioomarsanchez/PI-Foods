import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cleanRecipe, getDetail } from "../store/actions";
import { useEffect } from "react";
import style from '../styleSheets/details.module.css';

export default function Detail(props){
    console.log(props)
const dispatch = useDispatch();

useEffect(()=>{
    dispatch(getDetail(props.match.params.id));
}, [])
useEffect(()=>{
 return dispatch(cleanRecipe());
}, [])


 const recipe = useSelector((state=> state.recipe))
console.log(recipe)
return (
    <div>
        <Link to='/home'><button id={style.buttonBack} className={style.buttonBack} >Back to home</button> </Link>  
        
    {
      Object.keys(recipe).length?
      isNaN(Number(recipe.id)) ?
      <div className={style.container}>
          <h2>Recipe Name: {recipe.name}</h2>
          <span>Health Score {recipe.healthScore}</span>
          <h4>{recipe.diets?.map(d=>{return <span>{d.name}</span>})}</h4>
          <img className={style.img}src='https:i.pinimg.com/736x/7c/30/0d/7c300d26bc4a08e1cd78828a16c5ccca.jpg' alt="recipeImg" />
          <p className={style.p}>Summary: {recipe.summary}</p>
          <p className={style.p}>Steps: {recipe.steps}</p>
      </div>
      : <div className={style.container}>
      <h2>Recipe Name: {recipe.name}</h2>
      <span>Health Score {recipe.healthScore}</span>
      <h4>{recipe.diets?.map(d=>{return <span>{d}</span>})}</h4>
      <img className={style.img}src={recipe.image} alt="recipeImg" />
      <p className={style.p}>Summary: {recipe.summary?.replace(/<[^>]+>/g, "")}</p>
      <p className={style.p}>Steps: {recipe.steps?.replace(/<[^>]+>/g, "")}</p>
     </div>
     : <div className={style.gifContainer}><h3>Loading...</h3><img className={style.gif} src="https://i.pinimg.com/originals/55/35/1c/55351c797f0f2edb3b8686a3e81c996a.gif" alt="gif de carga"/></div>
}
    </div>
)

}