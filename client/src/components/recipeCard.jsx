import { Link } from "react-router-dom"

export default function RecipeCard({ id, name, diets, image, type, healthScore }){
    return( <div key={id}> 
       <Link to={`/home/recipe/${id}`}>{name}</Link>,
        {diets?.map(diets=><span >{diets}</span>)},
        <Link to={`/home/recipe/${id}`}><img src={image} alt='Img de receta'/></Link>,
        {type?.map(t=><span>{t}</span>)},
        {healthScore}
    </div>)
}