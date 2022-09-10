import React from "react";
import { Link } from "react-router-dom";
import style from '../styleSheets/landingPage.module.css';
import vid from '../vid/Food Reel 2019.mp4';

export default function LandingPage(){

    return (<>
    <div className={style.container}>
        <Link to='/home'>
        <h1 className={style.h1}>The food app</h1>
        <div className={style.linkHome} >
             Lets get started
        </div>
        </Link>
 
    <video className={style.video} loop autoPlay muted>
        <source src={vid} type='video/mp4'>
        </source>
    </video>
    </div>
    
    </>
    )

}