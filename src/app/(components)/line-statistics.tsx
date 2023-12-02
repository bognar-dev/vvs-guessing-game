

import React from 'react';
import { Station } from '../(types)/station';

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

    const getLastGuessedStations = () => {
        const lastGuessedStations = guessedStations.slice();
        return lastGuessedStations.map(stationId => {
            const station = stations.find(station => station.station_id === stationId);
            return station ? station : {} as Station;
        });
    };
    const colorVariants: { [key: string]: string } = {
        U1: 'bg-U1',
        U2: 'bg-U2',
        U3: 'bg-U3',
        U4: 'bg-U4',
        U5: 'bg-U5',
        U6: 'bg-U6',
        U7: 'bg-U7',
        U8: 'bg-U8',
        U9: 'bg-U9',
        U11: 'bg-U11',
        U12: 'bg-U12',
        U13: 'bg-U13',
        U14: 'bg-U14',
        U15: 'bg-U15',
        U16: 'bg-U16',
        U19: 'bg-U19',
        U29: 'bg-U29',
        U34: 'bg-U29',
        S1: 'bg-S1',
        S2: 'bg-S2',
        S3: 'bg-S3',
        S4: 'bg-S4',
        S5: 'bg-S5',
        S6: 'bg-S6',
        S11: 'bg-S1',
        S60: 'bg-S60',
        S62: 'bg-S62',       
    }

    return (
        <div>
            <h2>Overall Percentage of Guessed Stations: {overallPercentage.toFixed(2)}%</h2>
            <h3>Guessed Percentage by Line:</h3>
            <ul className='flex flex-wrap gap-2'>
                {lines.map((line:string) => (
                    <li className={`border text-white font-bold text-lg rounded-lg p-3 ${colorVariants[line]}`} key={line}>
                        {line}: {calculateGuessedPercentageByLine(line).toFixed(2)}%
                    </li>
                ))}
            </ul>
            <h3>Last Guessed Stations:</h3>
            <ul className='flex flex-wrap'>
                {getLastGuessedStations().map((station) => (
                    <li key={station.station_id} className='bg-slate-500 text-white rounded-full p-2 m-1'>
                        {station.name}
                        {station.lines.split(",").map((line,key) =>(
                            <span key={key} className={`bg-${line} text-black rounded-full px-1 py-0.5 m-1`}>{line}</span>
                        ))
                        }
                        
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LineStatistics;
