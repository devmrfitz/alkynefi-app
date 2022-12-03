import React, {useEffect, useContext, useState, useRef}  from 'react'
import {AuthContext,AuthContextProps} from "../../context/AuthContext";


function Login() {
    const {account, connect, disconnect} = useContext<AuthContextProps>(AuthContext);
    return (
        <div>
            <button className='mt-[10rem]' onClick={connect}>Connect wallet</button>
            <p>{account}</p>
            <button onClick={disconnect}>Disconnect wallet</button>
        </div>
    )
}

export default Login
