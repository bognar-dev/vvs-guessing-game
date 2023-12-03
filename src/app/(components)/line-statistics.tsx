

import React from 'react';
import { Station } from '../(types)/station';
import {colorVariants}  from '@/app/(data)/colorconfig';
import AnimatedCounter from '@/components/ui/animated-counter';

interface LineStatisticsProps {
    stations: Station[];
    guessedStations: number[];
    lines: string[];
}

const LineStatistics: React.FC<LineStatisticsProps> = ({
    stations,
    guessedStations,
    lines
}) => {
    const overallPercentage = (guessedStations.length / stations.length) * 100;

    const calculateGuessedPercentageByLine = (line: string) => {
        const totalStations = stations.filter(station => station.lines.includes(line)).length;
        const guessedStationsForLine = guessedStations.filter(stationId => stations.find(station => station.station_id === stationId)?.lines.includes(line)).length;
        return (guessedStationsForLine / totalStations) * 100;
    };

    
    

    return (
        <div>
            <h2>Overall Percentage of Guessed Stations: {overallPercentage.toFixed(2)}%</h2>
            <AnimatedCounter value={guessedStations.length} />
            <h3>Guessed Percentage by Line:</h3>
            <ul className='flex flex-wrap gap-2'>
                {lines.map((line:string) => (
                    <li className={`border text-white font-bold text-lg rounded-lg p-3 ${colorVariants[line]}`} key={line}>
                        {line}: {calculateGuessedPercentageByLine(line).toFixed(2)}%
                    </li>
                ))}
            </ul>
            
        </div>
    );
};

export default LineStatistics;
