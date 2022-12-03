import React, {useEffect, useContext, useState, useRef}  from 'react'
import {AuthContext,AuthContextProps} from "../context/AuthContext";
import { GetAlkyneWallet, CreateProfileHub } from '../utils/Functions';
export default function Teste() {

  const {getProvider} = useContext<AuthContextProps>(AuthContext);

  async function handler(){
    console.log("handler")
    let x = await  CreateProfileHub(getProvider);
    console.log(x," x new")
  }
  return (
    <div>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      
      <button 
    onClick={() => {
      console.log('teste')
      handler();
    } 
    }>teste</button>
    </div>
  )
}
