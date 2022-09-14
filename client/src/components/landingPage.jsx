import React from "react";
import { Link } from "react-router-dom";
import style from '../styleSheets/landingPage.module.css';
import vid from '../vid/Food Reel 2019.mp4';

export default function LandingPage(){

    return (<>
    <div className={style.container}>
        <Link to='/home'>
        <h1 className={style.linkHome} >
        The food app
        </h1>
        <h1 className={style.h1}>Let's get started</h1>
        </Link>
       
       
 
    <video className={style.video} loop autoPlay muted>
        <source src={vid} type='video/mp4'>
        </source>
    </video>
    </div>
    
    </>
    )

}