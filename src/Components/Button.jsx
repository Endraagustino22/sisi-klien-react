import { useState, React } from 'react'

function Button(props){
    return(
        <button onClick={props.klik} className={`px-3 mx-3 my-2 py-1 text-white ${props.background} ${props.bgHover} rounded`}>{props.text}</button>
    );
}

export default Button;
