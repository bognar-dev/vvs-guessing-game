"use client"
import React from 'react';
import { MapProvider } from 'react-map-gl';

interface MapProviderWrapperProps {
    children: React.ReactNode;
}

const MapProviderWrapper: React.FC<MapProviderWrapperProps> = ({ children }) => {
    return <MapProvider>{children}</MapProvider>;
};

export default MapProviderWrapper;
