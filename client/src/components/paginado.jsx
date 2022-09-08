import React from "react";

export default function Paginado ({recipesPerPage, recipes, setCurrentPage}){
    const pages = [];
    for (let i = 1; i <= Math.ceil(recipes/recipesPerPage); i++) {
        pages.push(i)
    }

    return(
        <div >
        <button onClick={() => setCurrentPage((curr) => curr!== 1? curr - 1 : curr)}>prev</button>
        {   pages &&
            pages.map((p, index) => {
                return <button key={index} onClick={() => setCurrentPage(p)}>{p}</button>
            })
        }
        <button onClick={() => setCurrentPage((curr) =>curr!== pages.length ? curr + 1 : curr)}>next</button>
    </div>
    )
}