import React from 'react';
import { Station } from '../(types)/station';
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import LineIcon from './line-icon';

interface LastGuessedStationsProps {
    stations: Station[];
    guessedStations: number[];
    className?: string;
}

const LastGuessedStations: React.FC<LastGuessedStationsProps> = ({ stations, guessedStations, className }) => {
    const getLastGuessedStations = () => {
        const lastGuessedStations = guessedStations.slice();
        return lastGuessedStations.map(stationId => {
            const station = stations.find(station => station.station_id === stationId);
            return station ? station : {} as Station;
        });
    };
    return (
            <Table className={className}>
                <TableCaption>Last guessed stations</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Name</TableHead>
                        <TableHead>Lines</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {getLastGuessedStations().reverse().map((station:Station,key:number) => (
                        <TableRow key={key}>
                            <TableCell className="font-medium">{station.name}</TableCell>
                            <TableCell className='flex flex-wrap'>{station.lines.split(",").map((line, key) => (
                                <LineIcon line={line} key={key} />
                            ))
                            }</TableCell>

                        </TableRow>

                    ))}

                </TableBody>
            </Table>
    );
};

export default LastGuessedStations;
