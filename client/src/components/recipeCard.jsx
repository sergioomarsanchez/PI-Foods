import { Link } from "react-router-dom";
import style from '../styleSheets/recipeCard.module.css'

export default function RecipeCard({ id, name, diets, image, type, healthScore }){
    return(
    <div className={style.cardContainer} key={id}> 
    <Link style={{textDecoration : 'none', color:"black"}}to={`/home/recipe/${id}`}>
            <div className={style.imageContainer}>
                <h3 className={style.name}>
                {name}
                </h3>
            <img className={style.img}
             src={image} alt='Img de receta'/>
            <section className={style.overlay}>
                <h6 className={style.slide}>-- Click for more info... --</h6>
                <h4 className={style.slide}>Health Score: {healthScore}</h4>
                <h5 className={style.slide}>Diet Types: {diets?.map(diets=><span className={style.dietSpan} >-{diets}-</span>)}
                </h5><br></br>
                <h5 className={style.slide}>Dish Types: {type?.map(t=><span className={style.typeSpan}>-{t}-</span>)}
                </h5>
            </section>
             </div>
    </Link>   
    </div>
    )
}