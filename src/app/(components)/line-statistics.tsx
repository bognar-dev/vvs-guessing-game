

import React from 'react';
import { Station } from '../(types)/station';
import { colorVariants, colorVariantsText } from '@/app/(data)/colorconfig';
import AnimatedCounter from '@/components/ui/animated-counter';
import { Gauge } from '@/components/ui/gauge';

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
                {lines.map((line: string) => (
                    
                    <Gauge
                        /* className = {`border text-white font-semibold text-xs rounded-lg p-0.5 px-1 ${colorVariants[line]}`} */
                        key={line}
                        value={parseFloat(calculateGuessedPercentageByLine(line).toFixed(2))}
                        size={'small'}
                        showValue={true}
                        colour={colorVariantsText[line]}
                        label={line}
                    />


                ))}
            </ul>

        </div>
    );
};

export default LineStatistics;
