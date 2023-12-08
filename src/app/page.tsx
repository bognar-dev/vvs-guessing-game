

import Image from 'next/image'
import GuessingGame from './(components)/guessing-game'
import { sql } from "@vercel/postgres";
import { Station } from './(types)/station';
import MapBoxMap from './(components)/map';
import { FeatureCollection } from 'geojson';

export default async function Home() {
 

const { rows } = await sql`SELECT * FROM Stations;`
const stations: Station[] = rows as Station[];



  return (
    <main className="">
        
      <GuessingGame stations={stations}/>
      
    </main>
  )
}
