
import GuessingGame from '@/app/[lang]/(components)/guessing-game'
import { sql } from "@vercel/postgres";
import { Station } from '../(types)/station';
import { getDictionary } from './dictionaries'

export default async function Home(params: { lang: string }) {

  const dictionary = await getDictionary(params.lang);
  const { rows } = await sql`SELECT * FROM Stations;`
  const stations: Station[] = rows as Station[];



  return (
    <main className="">

      <GuessingGame dict={dictionary} stations={stations} />

    </main>
  )
}
