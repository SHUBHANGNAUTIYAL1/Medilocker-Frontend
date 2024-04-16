import React ,{useEffect, useState }from 'react'
import "./Pharmacy.css"
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import MapComponent from '../../components/Mapcomponent'



function Pharmacy() {

  const [location,setLocation]=useState({latitude:"",longitude:""})
  const [show,setShow]=useState(false)
 
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
            console.log([position.coords.latitude, position.coords.longitude])
          setLocation({latitude:position.coords.latitude, longitude:position.coords.longitude});
          setShow(true)
          
        
        },
        (error) => {
          console.error('Error getting geolocation:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported.');
    }
  }, []);

  return (
    <>
    <Navbar />
    <div className="inner-container">
    <h1>Nearby Pharamacies</h1>
   {show && <MapComponent location={location} />}
    </div>
    <Footer />
  </>
    
  )
}

export default Pharmacy