import {useState} from 'react';
import {searchRecipe, searchRecipeById} from '../store/actions';
import { useDispatch } from 'react-redux';
import style from '../styleSheets/searchBar.module.css';


export default function SearchBar(){
   const [search, setSearch] = useState()

const dispatch = useDispatch()

   function onSubmit(e){
       e.preventDefault()
       console.log(search)
       if(!isNaN(Number(search)) || search.includes('-')){
           console.log('entreé a search por id con ' + search)
           dispatch(searchRecipeById(search))
           setSearch('')
       } else if(search){
        console.log('entreé a search por name con ' + search)
        dispatch(searchRecipe(search))
        setSearch('')
   }
}
   function onInputChange(e){
       setSearch(e.target.value)
}
   


    return( <div className={style.container}> 
        <form onSubmit={onSubmit}>
        <input className={style.input} type='text' 
        onChange={onInputChange} 
        value={search} 
        placeholder='Search Recipe'/>
        <input className={style.button} type='submit' value='Search'/>
        </form>
    </div>
    )
}

