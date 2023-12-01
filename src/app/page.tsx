import Image from 'next/image'
import GuessingGame from './(components)/guessing-game'
import { sql } from "@vercel/postgres";
import { Station } from './(types)/station';
export default async function Home() {
 

const { rows } = await sql`SELECT * FROM Stations;`
const stations: Station[] = rows as Station[];
console.log(stations)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <GuessingGame stations={stations}/>
    </main>
  )
}
