import React, { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useLoaderData } from 'react-router';

const Coverage = () => {
    const warhorses = useLoaderData()
    console.log(warhorses);
const mapRef = useRef(null)
    const position = [23.6850, 90.3563]

    const handleSearch = (e) => {
        e.preventDefault();
        const location = e.target.location.value;
        const district = warhorses.find (ce=>ce.district.toLowerCase().includes(location.toLowerCase()));
        if(district){
            const coordinate = [district.latitude, district.longitude];
            console.log(district,coordinate);
           mapRef.current.flyTo(coordinate,14)
        }

    }

    return (
        <div>
            <form className="mb-4 mt-8" onSubmit={handleSearch}>
                <label className="input">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input type="search" className="grow"
                    name='location'
                    placeholder="Search" />

                </label>
            </form>
            <MapContainer
                center={position}
                zoom={8}
                scrollWheelZoom={false}
                className='h-[800px]'
                ref={mapRef}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    warhorses.map((center, index) => <Marker position={[center.latitude, center.longitude]} key={index}>
                        <Popup>
                            <strong>{center.district}</strong><br />Service area {center.covered_area.join(', ')}
                        </Popup>
                    </Marker>)
                }
            </MapContainer>
        </div >

    );
};

export default Coverage;