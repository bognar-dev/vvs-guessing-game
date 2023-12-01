"use client"
import React, { useState, useEffect } from 'react';

interface Station {
    id: number;
    name: string;
}

const StuttgartTrainGame = () => {
    const [guess, setGuess] = useState('');
    const [message, setMessage] = useState('Guess the Stuttgart train station name!');
    const [remainingStations, setRemainingStations] = useState<Station[]>([
        { id: 1, name: 'Hauptbahnhof' },
        { id: 2, name: 'Feuersee' },
        { id: 3, name: 'Schlossplatz' },
        { id: 4, name: 'Universität' },
        { id: 5, name: 'Charlottenplatz' },
    ]);
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
        const remainingStationsCopy = [...remainingStations];
        const index = remainingStationsCopy.findIndex(station => station.name.toLowerCase() === guess.toLowerCase());

        if (index !== -1) {
            const guessedStation = remainingStationsCopy[index];
            remainingStationsCopy.splice(index, 1);
            setRemainingStations(remainingStationsCopy);
            setGuess('');
            setMessage('Correct! Keep guessing!');
            setGuessedStations(prevStations => [...prevStations, guessedStation.id]);
        } else {
            setMessage('Sorry, that\'s not correct. Try again!');
        }
    };

    const startNewGame = () => {
        setRemainingStations([
            { id: 1, name: 'Hauptbahnhof' },
            { id: 2, name: 'Feuersee' },
            { id: 3, name: 'Schlossplatz' },
            { id: 4, name: 'Universität' },
            { id: 5, name: 'Charlottenplatz' },
        ]);
        setGuess('');
        setMessage('Guess the Stuttgart train station name!');
        setGuessedStations([]);
        localStorage.removeItem('guessedStations');
        console.log('new game')
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl mb-4">{message}</h1>
            {remainingStations.length > 0 ? (
                <>
                    <input type="text" value={guess} onChange={handleInputChange} className="px-4 py-2 border border-gray-300 rounded-md mb-4" />
                    <button onClick={handleGuess} className="px-4 py-2 bg-blue-500 text-white rounded-md mb-2">Submit Guess</button>
                </>
            ) : (
                <p>Congratulations! You guessed all the stations!</p>
            )}
            <button onClick={startNewGame} className="px-4 py-2 bg-green-500 text-white rounded-md">New Game</button>
        </div>
    );
};

export default StuttgartTrainGame;
