import React, { useState } from "react";
import Calendar from "react-calendar";

const Main = () => {
   const [value, onChange] = useState(new Date())
    return (
        <>
            <h1>Hello</h1>
            <Calendar onChange={onChange} value={value}/>
            {console.log(value)}
        </>
        
    );
};

export default Main;
