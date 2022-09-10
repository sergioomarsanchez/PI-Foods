import React from "react";
import style from '../styleSheets/paginado.module.css';


export default function Paginado ({recipesPerPage, recipes, setCurrentPage}){
    const pages = [];
    for (let i = 1; i <= Math.ceil(recipes/recipesPerPage); i++) {
        pages.push(i)
    }

    return(
        <div >
        <button className={style.button} id={style.prev} onClick={() => setCurrentPage((curr) => curr!== 1? curr - 1 : curr)}>prev</button>
        {   pages &&
            pages.map((p, index) => {
                return <button  className={style.button} key={index} onClick={() => setCurrentPage(p)}>{p}</button>
            })
        }
        <button  className={style.button} id={style.next} onClick={() => setCurrentPage((curr) =>curr!== pages.length ? curr + 1 : curr)}>next</button>
    </div>
    )
}