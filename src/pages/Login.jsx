import React from "react";

import { useState,useEffect } from "react";

import { Link } from "react-router-dom";


export const  Login =()=>{

    const [name,setNAme]=useState("");
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");
        return(
            <>
            <label>name : </label>
            <input type="text" value={name} onChange={(e)=>setNAme(e.target.value)}/>
            <br/>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <br/>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <br/>
            <button onClick={()=>setNAme("sourya")}>click me!</button>
            <div>{name}</div>
            </>
        );
}