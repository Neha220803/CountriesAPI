import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import pointer from './location.png';

const customIcon = L.icon({
    iconUrl: pointer,
    iconSize: [38, 38],
    iconAnchor: [22, 44],
    popupAnchor: [-3, -46]
});

const MarkerMap = ({ latitude, longitude }) => {
    return (
        <MapContainer center={[latitude, longitude]} zoom={2} style={{ height: "340px", width: "100%" }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[latitude, longitude]} icon={customIcon}>
                <Popup>
                    Latitude: {latitude}, Longitude: {longitude}
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default MarkerMap;
