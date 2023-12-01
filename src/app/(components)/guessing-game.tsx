"use client"
import React, { useState, useEffect } from 'react';
import { Station } from '../(types)/station';
import LineStatics from './line-statistics';

const StuttgartTrainGame = ({stations}:{stations:Station[]}) => {
    const [guess, setGuess] = useState('');
    const [message, setMessage] = useState('Guess the Stuttgart train station name!');
    
    const [guessedStations, setGuessedStations] = useState<number[]>(()=>{
        const guessedStations = localStorage.getItem('guessedStations');
        if (guessedStations) {
            return JSON.parse(guessedStations);
        } else {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('guessedStations', JSON.stringify(guessedStations));
    }, [guessedStations]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGuess(e.target.value);
    };

    const handleGuess = () => {
        const guessIndex = stations.findIndex((station) => station.name.toLowerCase() === guess.toLowerCase());
        if (guessIndex > -1) {
            if (guessedStations.includes(stations[guessIndex].station_id)) {
                setMessage('You already guessed that station!');
            } else {
                setGuessedStations([...guessedStations, stations[guessIndex].station_id]);
                setMessage('Correct!');
            }
        } else {
            setMessage('Incorrect!');
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
    }, []);
    console.log(allLines)
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <LineStatics stations={stations} guessedStations={guessedStations}  />
            <h1 className="text-4xl mb-4">{message}</h1>
            {guessedStations.length !== stations.length ? (
                <>
                    <input type="text" value={guess} onChange={handleInputChange} className="px-4 py-2 border border-gray-300 rounded-md mb-4" />
                    <button onClick={handleGuess} className="px-4 py-2 bg-blue-500 text-white rounded-md mb-2">Submit Guess</button>
                </>
            ) : (
                <p>Congratulations! You guessed all the stations!</p>
            )}
            <button onClick={startNewGame} className="px-4 py-2 bg-green-500 text-white rounded-md">New Game</button>

            <p>All lines: {allLines.join(', ')}</p>
        </div>
    );
};

export default StuttgartTrainGame;