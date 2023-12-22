import { Button } from '@/components/ui/button';
import { DrawerClose } from '@/components/ui/drawer';
import React from 'react';
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from '@/components/ui/drawer';
import { Station } from '../(types)/station';
import LastGuessedStations from './last-guessed-stations';
import AnimatedCounter from '@/components/ui/animated-counter';

type LastStationsDrawerProps = {
    stations: Station[];
    guessedStations: number[];
};

const LastStationsDrawer: React.FC<LastStationsDrawerProps> = ({ stations, guessedStations }) => {

    return (
        <Drawer>
            <DrawerTrigger className='border mt-2 m-0.5 p-2 text-sm' >Letzte Eratene Stationen</DrawerTrigger>

            <DrawerContent className=''>
                <div className='text-sm flex gap-2 justify-center justify-items-center'>

                    <div className='grid grid-flow-row grid-rows-1 justify-items-center justify-center'>
                        <h2 className='font-semibold text-sm'>Erraten:</h2>
                        <AnimatedCounter value={guessedStations.length} />
                    </div>
                    <div className='grid grid-flow-row grid-rows-1 justify-items-center justify-center'>
                        <h2 className='font-semibold tesxt-sm'>Noch zu erraten:</h2>
                        <AnimatedCounter value={stations.length - guessedStations.length} />
                    </div>

                </div>
                <LastGuessedStations className='' stations={stations} guessedStations={guessedStations} />
                <DrawerClose className=''>
                    <Button variant="outline">Zurück zum Spiel</Button>
                </DrawerClose>

            </DrawerContent>
        </Drawer>
    );
};

export default LastStationsDrawer;
