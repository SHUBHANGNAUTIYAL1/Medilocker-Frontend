// Modal.js
import axios from "axios";
import React, { useState } from 'react';

import './prescription.css'; // Import CSS file for styling

const Prescription = ({ setOpen, patient ,id }) => {
  console.log(id)
  const [formData, setFormData] = useState({
    name: "",
    medications: [
      { medicationName: "", dosage: "", frequency: "" },
      { medicationName: "", dosage: "", frequency: "" },
      { medicationName: "", dosage: "", frequency: "" },
      { medicationName: "", dosage: "", frequency: "" }
    ],
    instructions: ""
  });

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const medications = [...formData.medications];
    medications[index] = { ...medications[index], [name]: value };
    setFormData({ ...formData, medications });
  };

  const handleFormChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const userid = user._id;
      formData.user = userid;
      formData.patient = patient; // Add patient value to the formData
      formData.report=id;
      const response = await axios.post('https://medilocker-backend.onrender.com/api/prescription/create', formData);
      console.log(response.data);
      alert("Prescription added successfully")
//to clear the details
      setFormData({
        name: "",
        medications: [
          { medicationName: "", dosage: "", frequency: "" },
          { medicationName: "", dosage: "", frequency: "" },
          { medicationName: "", dosage: "", frequency: "" },
          { medicationName: "", dosage: "", frequency: "" }
        ],
        instructions: ""
      });



      // Handle success
    } catch (error) {
      console.error("Error creating prescription:", error);
      alert("error")
      // Handle error
    }
  };

  return (
    <div className="pres">
      <div className="pres-content">
        <div className="navtop2">
          <span className="close" onClick={() => setOpen(false)}>&times;</span>
          <h1>Prescription</h1>
        </div>
        <div className="center">
          <form className="presform" onSubmit={handleSubmit}>
            {/* Your form inputs */}
            {/* Doctor Name */}
            <div className="formitem">
              <label htmlFor="doctorName">Doctor Name :</label>
              <input
                id="doctorName"
                className="form-input"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                placeholder="John"
                required
              />
            </div>
            {/* Medications */}
            {formData.medications.map((medication, index) => (
              <div key={index} className="formitem">
                <label htmlFor={`medicationName${index}`}>Medication {index + 1} :</label>
                <input
                  id={`medicationName${index}`}
                  className="form-input"
                  type="text"
                  name="medicationName"
                  value={medication.medicationName}
                  onChange={e => handleChange(index, e)}
                  placeholder="Medicine Name"
                  required
                />
                <input
                  className="form-input"
                  type="text"
                  name="dosage"
                  value={medication.dosage}
                  onChange={e => handleChange(index, e)}
                  placeholder="Dose"
                  required
                />
                <input
                  className="form-input"
                  type="text"
                  name="frequency"
                  value={medication.frequency}
                  onChange={e => handleChange(index, e)}
                  placeholder="frequency"
                  required
                />
              </div>
            ))}
            {/* Instructions */}
            <div className="formitem">
              <label htmlFor="instructions">Instructions :</label>
              <input
                id="instructions"
                className="form-input2"
                type="text"
                name="instructions"
                value={formData.instructions}
                onChange={handleFormChange}
                placeholder="instructions"
                required
              />
            </div>
            <button className="pres-submit" type="submit">Submit</button>
          </form>
        </div>
        <div className="foot2"></div>
      </div>
    </div>
  );
};

export default Prescription;
