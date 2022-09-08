import React from "react";
import { Link } from "react-router-dom";
import style from '../styleSheets/landingPage.css'

export default function LandingPage(){

    return (
    <div>
        <h1>Landing Page</h1>
        <Link to='/home'> Home </Link>
    </div>
)

}