"use client"
import React, { useState, useEffect } from 'react';
import { Station } from '../(types)/station';
import LineStatics from './line-statistics';
import LastGuessedStations from './last-guessed-stations';
import MapBoxMap from './map';
import { FeatureCollection } from 'geojson';
import levenshtein from 'fast-levenshtein';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import GuessBox from './guess-box';
import { MapProvider, useMap } from 'react-map-gl';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
    DrawerFooter,
} from "@/components/ui/drawer"

import { m } from 'framer-motion';
import { set } from 'react-hook-form';
import uFuzzy from '@leeoniya/ufuzzy';
import { stat } from 'fs';
import LastStationsDrawer from './last-stations-drawer';
let opts: uFuzzy.Options = {
    unicode: true,
    intraIns: 1,
    intraChars: '[\w-]',
    interChars: '.',
    intraMode: 1,

};

const StuttgartTrainGame = ({ stations }: { stations: Station[] }) => {
    const { map } = useMap();


    const { toast } = useToast()
    const [viewState, setViewState] = React.useState({
        longitude: 9.181126114,
        latitude: 48.78316027,
        zoom: 12
    });
    const [guessedStations, setGuessedStations] = useState<number[]>([]);

    useEffect(() => {

        const guessedStations = localStorage.getItem('guessedStations');
        if (guessedStations) {
            setGuessedStations(JSON.parse(guessedStations));
        }

    }, [])
    useEffect(() => {
        if (guessedStations.length > 0) localStorage.setItem('guessedStations', JSON.stringify(guessedStations));
    }, [guessedStations]);



    const handleGuess = (guess: string) => {


        const guessIndex = stations.findIndex((station) => {
            const strippedGuess = guess.replace(/[-/()\s]/g, "").toLowerCase();
            const strippedStation = station.name.replace(/[-/()\s]/g, "").toLowerCase();
            const distance = levenshtein.get(strippedGuess, strippedStation);
            return distance <= strippedStation.length * 0.2;
        });
        if (guessIndex > -1) {
            if (guessedStations.includes(stations[guessIndex].station_id)) {
                toast({
                    title: "Mist!",
                    description: `Du hast die Station ${stations[guessIndex].name} bereits erraten!`,
                    duration: 3000,
                })
                return false;
            } else {
                setGuessedStations([...guessedStations, stations[guessIndex].station_id]);
                toast({
                    title: "Hurra!",
                    description: `Du hast die Station ${stations[guessIndex].name} erraten!`,
                    duration: 3000,
                })

                /*  setViewState({
                     longitude: stations[guessIndex].x_coordinate,
                     latitude: stations[guessIndex].y_coordinate,
                     zoom: 12
                   }); */

                map?.flyTo({
                    center: [stations[guessIndex].x_coordinate, stations[guessIndex].y_coordinate],
                    zoom: 13.2,
                    essential: true // this animation is considered essential with respect to prefers-reduced-motion
                });

                return true;
            }
        } else {
            toast({
                title: "Mist!",
                description: `Die Station ${guess} gibt es nicht!`,
                variant: "destructive",
                duration: 3000,
            })
            return false;
        }
    };

    // Create a list of all lines that exist in the stations array
    const allLines = stations.reduce((lines: string[], station) => {
        station.lines.split(",").forEach((line) => {
            if ((line.includes('U') || line.includes('S')) && !lines.includes(line)) {
                lines.push(line);
            }
        });
        return lines;
    }, []).sort();
    const stationsGeoJson: FeatureCollection = {
        type: 'FeatureCollection',
        features: stations
            .map((station) => ({
                type: 'Feature',
                geometry: { type: 'Point', coordinates: [station.x_coordinate, station.y_coordinate] },
                properties: {
                }
            })),

    };

    const guessedStationsGeo: FeatureCollection = {
        type: 'FeatureCollection',
        features: guessedStations.map((stationId) => {
            const station = stations.find((s) => s.station_id === stationId);

            return {
                type: 'Feature',
                geometry: { type: 'Point', coordinates: [station?.x_coordinate || 0, station?.y_coordinate || 0] },
                properties: {
                    'Station Name': station?.name,
                }
            };
        }),
    };
    return (
        <div className="grid grid-cols-4 h-screen  overflow-hidden">
            <div className='col-span-4 lg:col-span-3'>
                <GuessBox handleGuess={handleGuess} />
                <MapBoxMap className='h-full ' stationsGeo={stationsGeoJson} guessedStationsGeo={guessedStationsGeo} viewState={viewState} setViewState={setViewState} />
            </div>
            <div className='lg:hidden z-10 px-5 py-2 mx-5 top-4   absolute rounded-md bg-white '>
                <LineStatics stations={stations} guessedStations={guessedStations} lines={allLines} />
               <LastStationsDrawer stations={stations} guessedStations={guessedStations} />
            </div>
            <div className='hidden lg:block col-span-1 bg-white p-5 overflow-y-scroll'>
                <LineStatics stations={stations} guessedStations={guessedStations} lines={allLines} />
                <LastGuessedStations className='overflow-y-visible' stations={stations} guessedStations={guessedStations} />
            </div>

        </div>
    );
};

export default StuttgartTrainGame;
