import Image from 'next/image'
import GuessingGame from './(components)/guessing-game'
import { sql } from "@vercel/postgres";
import { Station } from './(types)/station';
import MapBoxMap from './(components)/map';
import { FeatureCollection } from 'geojson';
import { CircleLayer } from 'react-map-gl';
const stationLayerStyle: CircleLayer = {
  id: 'point',
  type: 'circle',
  paint: {
      'circle-radius': 4,
      'circle-color': '#007cbf'
  }
};
export default async function Home() {
 

const { rows } = await sql`SELECT * FROM Stations;`
const stations: Station[] = rows as Station[];
const stationsGeoJson: FeatureCollection = {
  type: 'FeatureCollection',
  features: stations.map(station => ({
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [station.x_coordinate, station.y_coordinate] },
      properties: {} 
  }))
};


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <GuessingGame stations={stations}/>
      <MapBoxMap stationLayerStyle={stationLayerStyle} stationsGeoJson={stationsGeoJson} />
    </main>
  )
}
