import { sortByHS } from "../store/actions";
import { useDispatch } from "react-redux";
import style from '../styleSheets/orderByHS.module.css'

export default function OrderByHS(){
    const dispatch = useDispatch()
    function onSelectChange(e){
        dispatch(sortByHS(e.target.value))
    }
    return (
      < section className={style.order}>
    <label className={style.label} htmlFor="selectHSOrder">Health Score</label>
    <select className={style.select} name="selectHSOrder" onChange={onSelectChange}>
    <option value="order">Order by Health Score...</option>
    <option value="ascendente">Min-Max</option>
    <option value="descendente">Max-Min</option>
  </select>
  </section>

    ) 
}