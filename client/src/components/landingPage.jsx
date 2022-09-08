import React from "react";
import { Link } from "react-router-dom";
import style from '../styleSheets/landingPage.css'

export default function LandingPage(){

    return (
    <div className={style.container}>
        <h1 className={style.h1}>The food app</h1>
        <Link to='/home' className={style.linkHome}> Lets get started </Link>
    </div>
    )

}