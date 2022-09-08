import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cleanRecipe, getDetail } from "../store/actions";
import { useEffect } from "react";

export default function Detail(props){
    console.log(props)
const dispatch = useDispatch();

useEffect(()=>{
    dispatch(getDetail(props.match.params.id));
}, [dispatch])
useEffect(()=>{
 return dispatch(cleanRecipe());
}, [])


 const recipe = useSelector((state=> state.recipe))
console.log(recipe)
return (
    <div>
<Link to='/home'>Volver</Link>
    {
      Object.keys(recipe).length?
      recipe.id.legth> 6?
      <div>
          <h2>Receta: {recipe.name}</h2>
          <h4>{recipe.diets.map(d=>{return <span>{d.name}</span>})}</h4>
          <img src='https:i.pinimg.com/736x/7c/30/0d/7c300d26bc4a08e1cd78828a16c5ccca.jpg' alt="recipeImg" />
          <p>Resumen: {recipe.summary}</p>
          <p>Pasos: {recipe.steps}</p>
          <span>Health Score {recipe.healthScore}</span>
      </div>
      : <div>
      <h2>Receta: {recipe.name}</h2>
      <h4>{recipe.diets.map(d=>{return <span>{d}</span>})}</h4>
      <img src={recipe.image} alt="recipeImg" />
      <p>Resumen: {recipe.summary.replace(/<[^>]+>/g, "")}</p>
      <p>Pasos: {recipe.steps.replace(/<[^>]+>/g, "")}</p>
      <span>Health Score {recipe.healthScore}</span>
     </div>
     : <><h3>Loading...</h3><img src="https://i.pinimg.com/originals/55/35/1c/55351c797f0f2edb3b8686a3e81c996a.gif" alt="gif de carga"/></>
}
    </div>
)

}