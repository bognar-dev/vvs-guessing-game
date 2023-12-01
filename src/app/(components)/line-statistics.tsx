import React from 'react';
import { Station } from '../(types)/station';

interface LineStatisticsProps {
  stations: Station[];
  guessedStations: number[];
  
}

const LineStatistics: React.FC<LineStatisticsProps> = ({
    stations,
    guessedStations,
}) => {
    const overallPercentage = (guessedStations.length / stations.length) * 100;

    const calculateGuessedPercentageByLine = (line: string) => {
        const totalStations = stations.filter(station => station.lines.includes(line)).length;
        const guessedStationsForLine = stations.filter(station => station.lines.includes(line)).length;
        return (guessedStationsForLine / totalStations) * 100;
    };

    return (
        <div>
            <h2>Overall Percentage of Guessed Stations: {overallPercentage.toFixed(2)}%</h2>
            <h3>Guessed Percentage by Line:</h3>
         {/*    <ul>
                {Object.entries(guessedPercentageByLine).map(([line, _]) => (
                    <li key={line}>
                        {line}: {calculateGuessedPercentageByLine(line).toFixed(2)}%
                    </li>
                ))}
            </ul> */}
        </div>
    );
};

export default LineStatistics;
