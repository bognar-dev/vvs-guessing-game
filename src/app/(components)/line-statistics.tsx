

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
        <div className='flex justify-items-start justify-start flex-col gap-4 '>
            <h2 className=' text-md'><span className='  font-semibold text-xl'>{overallPercentage.toFixed(2)}%</span> Stations found</h2>
            
            <div className='hidden lg:flex gap-2 justify-center justify-items-center'>
                <div className='grid grid-flow-row grid-rows-1 justify-items-center justify-center'>
                    <h2 className='font-semibold'>Guessed:</h2>
                    <AnimatedCounter value={guessedStations.length} />
                </div>
                <div className='grid grid-flow-row grid-rows-1 justify-items-center justify-center'>
                    <h2 className='font-semibold'>To go:</h2>
                    <AnimatedCounter value={stations.length - guessedStations.length} />
                </div>
            </div>
            <h3 className='hidden lg:block'>Guessed Percentage by Line:</h3>
            <ul className='flex flex-wrap justify-items-center justify-center gap-2'>
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
