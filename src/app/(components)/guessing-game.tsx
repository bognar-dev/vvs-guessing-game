"use client"
import React, { useState, useEffect } from 'react';
import { Station } from '../(types)/station';
import LineStatics from './line-statistics';
import LastGuessedStations from './last-guessed-stations';
import Image from 'next/image';
import stadtbahn from '@/../public/stadtbahn.jpg';
import MapBoxMap from './map';
import { FeatureCollection } from 'geojson';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import GuessBox from './guess-box';
const StuttgartTrainGame = ({ stations }: { stations: Station[] }) => {
    const { toast } = useToast()
    const [guess, setGuess] = useState('');
    const [message, setMessage] = useState('Guess the Stuttgart train station name!');

    const [guessedStations, setGuessedStations] = useState<number[]>([]);

    useEffect(() => {
        
            const guessedStations = localStorage.getItem('guessedStations');
            if (guessedStations) {
               setGuessedStations(JSON.parse(guessedStations));
            } 
        
    },[])
    useEffect(() => {
        if (guessedStations.length > 0) localStorage.setItem('guessedStations', JSON.stringify(guessedStations));
    }, [guessedStations]);

   

    const handleGuess = (guess:string) => {
        const guessIndex = stations.findIndex((station) => station.name.toLowerCase() === guess.toLowerCase());
        if (guessIndex > -1) {
            if (guessedStations.includes(stations[guessIndex].station_id)) {
                toast({
                    title: "Mist!",
                    description: `Du hast die Station ${stations[guessIndex].name} bereits erraten!`,
                })
            } else {
                setGuessedStations([...guessedStations, stations[guessIndex].station_id]);
                setMessage('Correct!');
                toast({
                    title: "Hurra!",
                    description: `Du hast die Station ${stations[guessIndex].name} erraten!`,
                })
            }
        } else {
            toast({
                title: "Mist!",
                description: `Die Station ${guess} gibt es nicht!`,
            })
        }
    };

    const startNewGame = () => {
        setGuess('');
        setMessage('Guess the Stuttgart train station name!');
        setGuessedStations([]);
        localStorage.removeItem('guessedStations');
        console.log('new game')
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
            .filter((station) => !guessedStations.includes(station.station_id))
            .map((station) => ({
                type: 'Feature',
                geometry: { type: 'Point', coordinates: [station.x_coordinate, station.y_coordinate] },
                properties: {},
            })),

    };

    const guessedStationsGeo: FeatureCollection = {
        type: 'FeatureCollection',
        features: guessedStations.map((stationId) => {
            const station = stations.find((s) => s.station_id === stationId);

            return {
                type: 'Feature',
                geometry: { type: 'Point', coordinates: [station?.x_coordinate || 0, station?.y_coordinate || 0] },
                properties: {},
            };
        }),
    };
    console.log("All stations: " + stationsGeoJson.features.length, "Guessed stations: " + guessedStationsGeo.features.length)
    return (
        <>
            <div className="grid grid-cols-4 h-screen  overflow-hidden">
                <div className='col-span-3'>
                    <GuessBox handleGuess={handleGuess} />
                    <MapBoxMap className='h-full ' stationsGeo={stationsGeoJson} guessedStationsGeo={guessedStationsGeo} />
                </div>
                <div className='col-span-1 bg-white p-5 overflow-y-scroll'>
                    <LineStatics stations={stations} guessedStations={guessedStations} lines={allLines} />
                    <LastGuessedStations className='overflow-y-scroll' stations={stations} guessedStations={guessedStations} />
                </div>
            </div>
            

        </>
    );
};

export default StuttgartTrainGame;
