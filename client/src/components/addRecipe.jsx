import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { postRecipe, getDiets, fetchRecipes } from "../store/actions";
import style from '../styleSheets/addRecipe.module.css';

function validate(input){
    let errors = {};
    if(!input.name){
        errors.name = 'A name is required'
    }
    if(!input.summary){
        errors.summary = 'A summary of your recipe is required'
    }
    if (!input.healthScore){
            errors.healthScore = 'The health score of your recipe is required'
    } 
    if(!input.steps){
        errors.steps = 'The steps of your recipe is required'
    }
     if(!input.diets.length){
        errors.diets = 'At least one type of diet is required'
    }
    if (isNaN(Number(input.healthScore))){
        errors.healthScore = 'The health score must be a number'
    } else if (input.healthScore>100 || input.healthScore<1){
        errors.healthScore = 'The health score must be a number between 1 and 100'
    }
    return errors
}


export default function AddRecipe(){
    const dispatch = useDispatch()

    const history = useHistory();
    const diets = useSelector((state)=>state.diets);
    const [errors, setErrors] = useState({});
    
    const [input, setInput] = useState({
        name:'',
        summary:'',
        healthScore: '',
        steps: '',
        diets: []
        
    })
    useEffect(() => {
        if(!diets.length)dispatch(getDiets())
    }, [diets.length, dispatch])
    
    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }
    function handleCheck(e){
        if(e.target.checked){
            setInput({
                ...input,
                diets: [...input.diets, e.target.value]
            })
            setErrors(validate({
                ...input,
                diets: [...input.diets, e.target.value]
            }))
        } else {
            setInput({
                ...input,
                diets: input.diets.filter(d => d !== e.target.value)
            })
            setErrors(validate({
                ...input,
                diets: input.diets.filter(d => d !== e.target.value)
            }))
        }
    
    }

    function handleSubmit(e){
        e.preventDefault()
       input.name = input.name.charAt(0).toUpperCase()+input.name.slice(1)
        console.log(input)
        dispatch(postRecipe(input))
        dispatch(fetchRecipes())
        alert('Your recipe has been created!!')
        setInput({
            name:'',
            summary:'',
            healthScore: '',
            steps: '',
            diets: []
        })
        history.push('/home')
    }

    return (
        <>
        <Link to='/home'><button id={style.buttonBack} className={style.buttonBack} >Back to home</button> </Link>
        <div className={style.container}>
        <h1>Create your Recipe!</h1>
   <form className={style.form} onSubmit={e=>handleSubmit(e)}>
   <div>
   <label>Name: </label> <br /><input className={style.inputs} type="text" placeholder="e.g. Tiramisú" value={input.name} name='name' onChange={(e)=>handleChange(e)}/>
   {errors.name? <div className={style.errorDiv}>*{errors.name}</div>: null}
   </div>
   <div>
   <label>Health Socre (1-100): </label><br /><input  className={style.inputs} type="text" placeholder="1-100" value={input.healthScore} name='healthScore' onChange={(e)=>handleChange(e)}/>
   {errors.healthScore? <div className={style.errorDiv}>*{errors.healthScore}</div>: null}
   </div>
   <div>
   <label>Summary: </label><br /> <input id={style.summary} className={style.inputs}  type="text" placeholder="summary"value={input.summary} name='summary' onChange={(e)=>handleChange(e)}/>
   {errors.summary? <div className={style.errorDiv}>*{errors.summary}</div>: null}
   </div>
   <label>Steps: </label><input  id={style.steps} className={style.inputs} type="text" placeholder="steps" value={input.steps} name='steps' onChange={(e)=>handleChange(e)}/>
   {errors.steps? <div className={style.errorDiv}>*{errors.steps}</div>: null}
   <div>
   <h3>Pick type of diet/s</h3>
   {errors.diets? <div className={style.errorDiv}>*{errors.diets}</div>: null}
   </div>
   <div>
   {
       diets?.map(d=>{
           return <>
           <input className={style.checkbox}
           id={d.name}
           type='checkbox'
           onChange={(e)=>handleCheck(e)}
           value={d.name==='Low FODMAP'
                           ? 'fodmap friendly'
                           : d.name ==='Paleo'
                           ? 'paleolithic'
                           : d.name.toLowerCase()}/> 
        <label className={style.checkboxLbl} htmlFor={d.name} key={d.name}>{d.name}</label> 
        </> 
       })
   }
   <input className={style.buttonBack} type="submit" disabled={Object.keys(errors).length!== 0 || !input.name ? true : false} value='Add your Recipe'/>
   </div>
   </form>
   </div>
   </>
    ) 
}