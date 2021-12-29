import React from "react";
import "../styles/Hero.css";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <div className="hero">
        <div id="herotext">
        <p className='heroAboutus'>Make the most of your home now more than ever!</p>
        <p className='heroAboutus2'>At Broke&fix  we take pride in partnering with skilled craftsmen <br></br>from a variety of specialties to provide you with peace of mind <br></br> when tackling all of your home improvement needs.</p>
        </div>
        <img id="bgheroimg" src="../assets/hero2.png" alt="herobackground"/>
      </div>
      <div className='buttonshero'>
        <button  className='btnhero'><Link to='/' ><img className='imgbtn' src="../assets/cleaning.png" /></Link></button>
        <button  className='btnhero'><img className='imgbtn' src="../assets/Electrician.png" /></button>
        <button  className='btnhero'><img className='imgbtn' src="../assets/gas.png" /></button>
        <button  className='btnhero'><img className='imgbtn' src="../assets/plumber.png" /></button>
        <button  className='btnhero'><img className='imgbtn' src="../assets/carpenter.png" /></button>
        <button  className='btnhero'><img className='imgbtn' src="../assets/locksmit.png" /></button>
      </div>
    </>
  )
}

export default Hero;
