import { filterDiet, getDiets } from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import style from '../styleSheets/filterDiet.module.css';


export default function FilterDiets(){
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(getDiets())
        
    }, [])
    let diets = useSelector((state)=>state.diets);

    function onSelectChange(e){
        dispatch(filterDiet(e.target.value))
    }


    return (
        <section className={style.order}>
        <label className={style.label} htmlFor="select">Filter by Diet type</label>
        <select className={style.select} id='select' name="select" onChange={onSelectChange} >
        <option key='sin filtro'  >No filter</option>
        {diets?
        diets.map(d=>{
            return <option 
                key={d.id}
                value={d.name==='Low FODMAP'
                ? 'fodmap friendly'
                : d.name ==='Paleo'
                ? 'paleolithic'
                : d.name.toLowerCase()} >
                {d.name}
            </option>
        })
        : 'No hay dietas declaradas'
        }
  
  </select>
        </section>
    )
}