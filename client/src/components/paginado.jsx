import React from "react";

export default function Paginado ({recipesPerPage, recipes, paginado}){
    const pageNumber = [];
    for (let i = 1; i <= Math.ceil(recipes/recipesPerPage); i++) {
        pageNumber.push(i)
    }

    return(
        <nav>
            <ul className="paginado">
                {pageNumber && 
                pageNumber.map(number=>(
                    <li className="number" key={number}>
                      <button onClick={()=> paginado(number)}>{number}</button>
                   </li>
                ))}
            </ul>
        </nav>
    )
}