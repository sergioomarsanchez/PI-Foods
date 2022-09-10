import { sort } from "../store/actions";
import { useDispatch } from "react-redux";
import style from '../styleSheets/order.module.css'

export default function Order(){
    const dispatch = useDispatch()
    function onSelectChange(e){
        dispatch(sort(e.target.value))
    }
    return (
    < section className={style.order}>
      <label className={style.label} htmlFor="orderName">Name: </label>  
      <select className={style.select} id='orderName'name="select" onChange={onSelectChange}>
          <option value="ordenar">Order by name...</option>
          <option value="ascendente">A-Z</option>
          <option value="descendente">Z-A</option>
        </select>
    </section>
    )
}