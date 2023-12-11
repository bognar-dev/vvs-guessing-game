import React from 'react';
import { Station } from '../(types)/station';
import { colorVariants, colorVariantsText } from '@/app/(data)/colorconfig';
import AnimatedCounter from '@/components/ui/animated-counter';
import { Gauge } from '@/components/ui/gauge';
import { ChevronDown, Plus, X } from "lucide-react"
import { useAutoAnimate } from '@formkit/auto-animate/react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from '@/components/ui/button';
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
    const [parent, enableAnimations] = useAutoAnimate(/* optional config */)
    const [isOpen, setIsOpen] = React.useState(false)
    const overallPercentage = (guessedStations.length / stations.length) * 100;

    const calculateGuessedPercentageByLine = (line: string) => {
        const totalStations = stations.filter(station => station.lines.includes(line)).length;
        const guessedStationsForLine = guessedStations.filter(stationId => stations.find(station => station.station_id === stationId)?.lines.includes(line)).length;
        return (guessedStationsForLine / totalStations) * 100;
    };


    const sortedLines = lines.sort((a: string, b: string) => {
        const percentageA = calculateGuessedPercentageByLine(a);
        const percentageB = calculateGuessedPercentageByLine(b);
        return percentageB - percentageA;
    });



    return (
        <div className='flex justify-items-center justify-center md:justify-items-start md:justify-start flex-col gap-4 '>
            <h2 className=' text-md'><span className='  font-semibold text-xl'>{overallPercentage.toFixed(2)}%</span> Stationen erraten</h2>

            <div className='hidden lg:flex gap-2 justify-center justify-items-center'>
                <div className='grid grid-flow-row grid-rows-1 justify-items-center justify-center'>
                    <h2 className='font-semibold'>Erraten:</h2>
                    <AnimatedCounter value={guessedStations.length} />
                </div>
                <div className='grid grid-flow-row grid-rows-1 justify-items-center justify-center'>
                    <h2 className='font-semibold'>Noch zu erraten:</h2>
                    <AnimatedCounter value={stations.length - guessedStations.length} />
                </div>
            </div>
            <ul ref={parent} className='hidden md:flex  flex-wrap justify-items-center justify-start gap-2'>
                {sortedLines.map((line: string) => (

                    <Gauge
                        className='hidden md:flex'
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
            <Collapsible
                open={isOpen}
                onOpenChange={setIsOpen}
                className=" md:hidden"
            >

                <CollapsibleTrigger className="mb-2" asChild>
                    <ul ref={parent}  className='flex lg:hidden'>
                        <Button variant="ghost" size="sm" className="w-4 p-0">
                            <ChevronDown className="h-4 w-4" />
                            <span className="sr-only">Toggle</span>
                        </Button>
                        <div className='flex flex-wrap justify-items-center justify-start md:hidden gap-2 px-2'>
                        {sortedLines.slice(0, 12).map((line: string) => (
                            <Gauge
                                className=''
                                /* className = {`border text-white font-semibold text-xs rounded-lg p-0.5 px-1 ${colorVariants[line]}`} */
                                key={line}
                                value={parseFloat(calculateGuessedPercentageByLine(line).toFixed(2))}
                                size={'tiny'}
                                showValue={true}
                                colour={colorVariantsText[line]}
                                label={line}
                            />
                        ))}
                        </div>
                    </ul>

                </CollapsibleTrigger>
                <CollapsibleContent className="">
                <ul ref={parent} className='flex lg:hidden '>
                        <Button variant="ghost" size="sm" className=" hidden w-4 p-0">
                            <ChevronDown className="h-4 w-4" />
                            <span className="sr-only">Toggle</span>
                        </Button>
                        <div className='flex flex-wrap justify-items-center justify-start md:hidden gap-2 pl-6'>
                        {sortedLines.slice(12).map((line: string) => (
                            <Gauge
                                className=''
                                /* className = {`border text-white font-semibold text-xs rounded-lg p-0.5 px-1 ${colorVariants[line]}`} */
                                key={line}
                                value={parseFloat(calculateGuessedPercentageByLine(line).toFixed(2))}
                                size={'tiny'}
                                showValue={true}
                                colour={colorVariantsText[line]}
                                label={line}
                            />
                        ))}
                        </div>
                    </ul>
                </CollapsibleContent>
            </Collapsible>

        </div>
    );
};

export default LineStatistics;

