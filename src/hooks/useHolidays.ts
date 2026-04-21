import { useState, useEffect } from "react"
import { MOCK_HOLIDAYS } from "../data/holidays"

interface ApiDay {
    datum: string
    "röd dag": string
}

interface ApiResponse {
    dagar: ApiDay[]  // en lista med alla dagar för ett år
}


export function useHolidays() {
    //Lista med helgdagar
    const [holidays, setHolidays] = useState<string[]>([])

    //True medan vi väntar på API
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        async function fetchHolidays() {
            try {
                //väntar 1.5 sekunder för att visa kalender
                await new Promise(resolve => setTimeout(resolve, 1500))

                //hämtar helgdagar för 2026 och 2027 samtidigt
                const [res1, res2] = await Promise.all([
                    fetch(`https://sholiday.faboul.se/dagar/v2.1/2026`),
                    fetch(`https://sholiday.faboul.se/dagar/v2.1/2027`)
                ])

                //Omvandlar till JS-objekt
                const [data1, data2]: ApiResponse[] = await Promise.all([
                    res1.json(),
                    res2.json()])

                // Behåller bara röda dagar och plockar ut datumen
                const allHolidays = [...data1.dagar, ...data2.dagar]
                  .filter(day => day["röd dag"] === "Ja")
                  .map(day => day.datum)

                const exclude = ["2026-05-01", "2027-01-01"]
                const filteredHolidays = allHolidays.filter(date => !exclude.includes(date))

                setHolidays(filteredHolidays)

            } catch {
                //Om API inte svarar använder mockad data
                console.warn("API misslyckades, använder mockad data")
                setHolidays(MOCK_HOLIDAYS)
            } finally {
                setLoading(false)
            }
        }
        fetchHolidays()
    }, [])
    //Returnera helgdagar och laddar status till calendar
    return { holidays, loading }
}
