import {useState} from 'react';
import {fetchRecipes} from '../store/actions';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';


export default function SearchBar(){
   const [search, setSearch] = useState()

const dispatch = useDispatch()
   function onSubmit(e){
       e.preventDefault()
       dispatch(fetchRecipes(search))
       setSearch('')
   }
   function onInputChange(e){
       setSearch(e.target.value)
}


    return( <div> 
        <Link to='/addRecipe' >Crear Receta</Link>

        <form onSubmit={onSubmit}>
        <input type='text' 
        onChange={onInputChange} 
        value={search} 
        placeholder='Buscar receta'/>
        <input type='submit' value='Buscar'/>
        </form>
    </div>)
}