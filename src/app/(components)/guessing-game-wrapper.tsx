
"use client"
import Image from 'next/image'
import GuessingGame from './guessing-game'
import { sql } from "@vercel/postgres";
import { Station } from '@/app/(types)/station';

import { FeatureCollection } from 'geojson';
import { MapProvider } from 'react-map-gl';

export default async function GameWrapper({ stations }: { stations: Station[] }) {

    return (
       
            <MapProvider>
                <GuessingGame stations={stations} />
            </MapProvider>
        
    )
}