import { Button } from '@/components/ui/button';
import { DrawerClose } from '@/components/ui/drawer';
import React from 'react';
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from '@/components/ui/drawer';
import { Station } from '../(types)/station';
import LastGuessedStations from './last-guessed-stations';

type LastStationsDrawerProps = {
    stations: Station[];
    guessedStations: number[];
};

const LastStationsDrawer: React.FC<LastStationsDrawerProps> = ({ stations, guessedStations }) => {
    
    return (
        <Drawer>
            <DrawerTrigger className='border m-0.5 p-2 text-sm' >Letzte Eratene Stationen</DrawerTrigger>
            <DrawerContent>
                <LastGuessedStations className='mb-3' stations={stations} guessedStations={guessedStations} />
                    <DrawerClose className='mb-3'>
                        <Button variant="outline">Zurück zum Spiel</Button>
                    </DrawerClose>
                
            </DrawerContent>
        </Drawer>
    );
};

export default LastStationsDrawer;
