// Modal.js
import axios from "axios";
import React, { useState } from 'react';

import './pres.css'; // Import CSS file for styling
import useFetch from "../../hook/useFetch";

const Pres = ({ setOpen, item }) => {
  const user = JSON.parse(localStorage.getItem('user'));
    console.log(item._id);
    const { data, loading, error } = useFetch(`http://localhost:8100/api/prescription/report/${item._id}`);
    console.log(data.Pres);
  

  return (
    <div className="presc">
      <div className="presc-content">
        <div className="navtop3">
          <span className="close" onClick={() => setOpen(false)}>&times;</span>
          <h1>Prescription</h1>
        </div>
        { user.role==='patient' ?( <div className="centerp">
            <h2>Doctor : Dr. {item.name}</h2>
            <h2>Medicine1 : {item.medications[0].medicationName} , Dosage : {item.medications[0].dosage} ,  Frequency :{item.medications[0].frequency}</h2>
            <h2>Medicine2 : {item.medications[1].medicationName} , Dosage : {item.medications[1].dosage}  , Frequency :{item.medications[1].frequency}</h2>
            <h2>Medicine3 : {item.medications[2].medicationName} , Dosage : {item.medications[2].dosage} , Frequency :{item.medications[2].frequency}</h2>
            <h2>Medicine4 : {item.medications[3].medicationName} , Dosage : {item.medications[3].dosage} , Frequency :{item.medications[3].frequency}</h2>
            <h2> Instructions: {item.instructions}</h2>

          
        </div>):(

          <div className="centerp">
            { loading?"loading":(
              <>
               {data.Pres.map((item) => (
              <>          <h2 key={1}>Doctor : Dr. {item.name}</h2>
          <h2 key={2}>Medicine1 : {item.medications[0].medicationName} , Dosage : {item.medications[0].dosage} ,  Frequency :{item.medications[0].frequency}</h2>
          <h2 key={3}>Medicine2 : {item.medications[1].medicationName} , Dosage : {item.medications[1].dosage}  , Frequency :{item.medications[1].frequency}</h2>
          <h2 key={4}>Medicine3 : {item.medications[2].medicationName} , Dosage : {item.medications[2].dosage} , Frequency :{item.medications[2].frequency}</h2>
          <h2 key={5}>Medicine4 : {item.medications[3].medicationName} , Dosage : {item.medications[3].dosage} , Frequency :{item.medications[3].frequency}</h2>
          <h2 key={6}> Instructions: {item.instructions}</h2>  
          </>

               ))}
               </>
            )


          }  

          </div>


        ) }
        <div className="foot3"></div>
      </div>
    </div>
  );
};

export default Pres;
