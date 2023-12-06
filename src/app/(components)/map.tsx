'use client'

import { sql } from '@vercel/postgres';
import React, { useRef, useState, useEffect } from 'react';
import Map, { CircleLayer, Layer, Source } from 'react-map-gl';
import { FeatureCollection } from 'geojson';
import { mapConfig } from '../(data)/mapconfig';

const MapBoxMap = ({ stationsGeo, guessedStationsGeo, className,viewState,setViewState }:
  {
    stationsGeo: FeatureCollection,
    guessedStationsGeo: FeatureCollection,
    className?: string,
    viewState: {
      longitude: number,
      latitude: number,
      zoom: number
    },
    setViewState: React.Dispatch<React.SetStateAction<{
      longitude: number,
      latitude: number,
      zoom: number
    }>>
        }) => {



  return (
    <div className={className}>
      <Map
        mapboxAccessToken={mapConfig.accessKey}

        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        style={{ width: "100%", height: "100%" }}
        mapStyle={mapConfig.style}
      >
        <Source id="stations" type="geojson" data={stationsGeo}>
          <Layer {...mapConfig.stationLayerStyle} />
        </Source>
        <Source id="guessedStations" type="geojson" data={guessedStationsGeo} >
          <Layer {...mapConfig.guessedStationLayerStyle} />
        </Source>
      </Map>
    </div>
  );
}

export default MapBoxMap;