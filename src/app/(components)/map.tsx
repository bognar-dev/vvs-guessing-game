'use client'

import { sql } from '@vercel/postgres';
import React, { useRef, useState, useEffect } from 'react';
import Map, { CircleLayer, Layer, Source } from 'react-map-gl';
import { FeatureCollection } from 'geojson';

const MapBoxMap =  ({stationsGeoJson,stationLayerStyle}:{stationsGeoJson:FeatureCollection,stationLayerStyle:CircleLayer}) => {
  
    const [viewState, setViewState] = React.useState({
        longitude: 9.181126114,
        latitude: 48.78316027,
        zoom: 12
      });
    
return(
    <Map
    mapboxAccessToken="pk.eyJ1IjoibmlraWJnbnIiLCJhIjoiY2xwbXY4eWY5MGR1MzJxcW5sNXNtZXpiMyJ9.2bowtyVE-DbmLOTzcgXhgQ"
    
    {...viewState}
    onMove={evt => setViewState(evt.viewState)}
    style={{width: 600, height: 400}}
    mapStyle="mapbox://styles/mapbox/streets-v9"
  >
    <Source id="my-data" type="geojson" data={stationsGeoJson}>
        <Layer {...stationLayerStyle} />
      </Source>
  </Map>
);
}

export default MapBoxMap;