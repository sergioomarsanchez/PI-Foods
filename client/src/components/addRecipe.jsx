import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { postRecipe, getDiets } from "../store/actions";

function validate(input){
    let errors = {};
    if(!input.name){
        errors.name = 'Se requiere un nombre de receta'
    }
    if(!input.summary){
        errors.summary = 'Se requiere un resumen de la receta'
    }
    if (!input.healthScore){
            errors.healthScore = 'Se requiere un Health Score de la receta'
    } 
    if(!input.steps){
        errors.steps = 'Se requiere los pasos/steps de la receta'
    }
     if(!input.diets.length){
        errors.diets = 'Se requiere al menos un tipo de dieta para la receta'
    }
    if (isNaN(Number(input.healthScore))){
        errors.healthScore = 'Se requiere que el Health Score sea un número'
    } else if (input.healthScore>100 || input.healthScore<1){
        errors.healthScore = 'El Health Score debe ubicarse ente 1 y 100'
    }
    return errors
}


export default function AddRecipe(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDiets())
    }, [])
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
        alert('Receta creada!!')
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
        <Link to='/home'><button>Volver</button> </Link>
        <h1>Crea tu Receta!</h1>
   <form onSubmit={e=>handleSubmit(e)}>
   <label>Nombre</label> <input type="text" placeholder="ej. Tiramisú" value={input.name} name='name' onChange={(e)=>handleChange(e)}/>
   {errors.name? <span>*{errors.name}</span>: null}
   <label>Resumen</label> <input type="text" placeholder="resumen"value={input.summary} name='summary' onChange={(e)=>handleChange(e)}/>
   {errors.summary? <span>*{errors.summary}</span>: null}
   <label>Health Socre (1-100)</label><input type="text" placeholder="1-100" value={input.healthScore} name='healthScore' onChange={(e)=>handleChange(e)}/>
   {errors.healthScore? <span>*{errors.healthScore}</span>: null}
   <label>Pasos</label> <input type="text" placeholder="pasos" value={input.steps} name='steps' onChange={(e)=>handleChange(e)}/>
   {errors.steps? <span>*{errors.steps}</span>: null}
   <h3>Selecciona tipo de dieta</h3>
   {errors.diets? <span>*{errors.diets}</span>: null}
   {
       diets?.map(d=>{
           return <>
           <input
           type='checkbox'
           onChange={(e)=>handleCheck(e)}
           value={d.name==='Low FODMAP'
                           ? 'fodmap friendly'
                           : d.name ==='Paleo'
                           ? 'paleolithic'
                           : d.name.toLowerCase()} /> 
        <label name={d.name} key={d.name}>{d.name}</label>    
        </> 
       })
   }
   <input type="submit" disabled={Object.keys(errors).length!== 0 || !input.name ? true : false} value='submit'/>
   </form>
   </>
    ) 
}