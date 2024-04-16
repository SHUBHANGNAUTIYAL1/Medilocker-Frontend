import React, { useState } from 'react';
import './medicine.css';
import axios from 'axios';
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';

function Medicine() {
  const [medicineName, setMedicineName] = useState('');
  const [medicineDetails, setMedicineDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const options = {
      method: 'GET',
      url: 'https://drug-info-and-price-history.p.rapidapi.com/1/druginfo',
      params: { drug: medicineName },
      headers: {
        'X-RapidAPI-Key': 'd3a6847bc8mshebafffeab74896ap1769c0jsn42433ff60eb3',
        'X-RapidAPI-Host': 'drug-info-and-price-history.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setMedicineDetails(response.data);
      console.log(response)
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }

    console.log(medicineDetails)
  };

  return (
    <>
    <Navbar/>
    <div className="medicine-container">
      <form className="medform"  onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter medicine name"
          value={medicineName}
          onChange={(e) => setMedicineName(e.target.value)}
          className="medicine"
        />
        <button className="medbutton" type="submit">Search</button>
      </form>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {medicineDetails && (
        <div className="medicine-details">
          <h2>Medicine Details</h2>
          <p>Generic Name: {medicineDetails[0].generic_name}</p>
          <p>Brand Name: {medicineDetails[0].brand_name_base}</p>
          <p>Dosage Form: {medicineDetails[0].dosage_form}</p>
          {/* Add more details as needed */}
        </div>
      )}
      </div>
      <Footer />

      </>
    
  );
}

export default Medicine;
