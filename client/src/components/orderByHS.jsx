import { sortByHS } from "../store/actions";
import { useDispatch } from "react-redux";

export default function OrderByHS(){
    const dispatch = useDispatch()
    function onSelectChange(e){
        dispatch(sortByHS(e.target.value))
    }
    return (
    <>
    <label htmlFor="selectHSOrder">Health Socre</label>
    <select name="selectHSOrder" onChange={onSelectChange}>
    <option value="ascendente">Menor-Mayor</option>
    <option value="descendente">Mayor-Menor</option>
  </select>
  </>

    ) 
}