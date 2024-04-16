import React,{ useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios'


const redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});
const blueIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});


function MapComponent({location}) {
    const [currentLocation, setCurrentLocation] = useState(null);
    
    const [pharmacies, setPharmacies] = useState([])
    useEffect(() => {
        fetchPharmacies()
        
      }, [location]);

      const fetchPharmacies = async () => {
        console.log("hi")
       let latitude=location.latitude;
       let longitude=location.longitude;
        
        const options = {
            method: 'GET',
            url: 'https://trueway-places.p.rapidapi.com/FindPlacesNearby',
            params: {
              location: `${latitude},${longitude}`,
              type: 'pharmacy',
              radius: '1000',
              language: 'en'
            },
            headers: {
              'X-RapidAPI-Key': 'a8e25abea7msh8465279dfb74285p1645c5jsn70922a7ec0cf',
              'X-RapidAPI-Host': 'trueway-places.p.rapidapi.com'
            }
          };
          
          try {
              const response = await axios.request(options);
              setPharmacies(response.data.results)
              console.log(response.data);
          } catch (error) {
              console.error(error);
          }
          
      };

      
      
  return (
    
<MapContainer center={[location.latitude,location.longitude] || [51.505, -0.09]} zoom={13} style={{ height: '70%', width: '80%' , borderRadius:'0.5rem' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
        <>
          <Marker position={[location.latitude,location.longitude]} icon={redIcon}>
            <Popup>
              Your current location.
            </Popup>
          </Marker>
          {pharmacies.map((pharmacy, index) => (
            <Marker key={index} position={[pharmacy.location.lat, pharmacy.location.lng]} icon={blueIcon}>
              <Popup>
                <h3>Name : {pharmacy.name}</h3>
                <h3>Distance : {pharmacy.distance}</h3>
                <h3>Address : {pharmacy.address}</h3>
              </Popup>
            </Marker>
          ))}
        </>
      
    </MapContainer>
  );
}

export default MapComponent;