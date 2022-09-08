import { sort } from "../store/actions";
import { useDispatch } from "react-redux";

export default function Order(){
    const dispatch = useDispatch()
    function onSelectChange(e){
        dispatch(sort(e.target.value))
    }
    return (
      <>
      <label htmlFor="selectHSOrder">Nombre</label>  
    <select name="select" onChange={onSelectChange}>
    <option value="ordenar">ordenar por nombre</option>
    <option value="ascendente">A-Z</option>
    <option value="descendente">Z-A</option>
  </select>
  </>
    )
}