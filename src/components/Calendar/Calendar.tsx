import { useState } from "react"
import ReactCalendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import "./calendar.css"
import { useHolidays } from "../../hooks/useHolidays"
import { useBookedPackages } from "../../hooks/useBookedPackages"

interface CalendarProps {
    onDateSelect: (date: string) => void;
    spaPackage: string
    time: string
}

function Calendar({ onDateSelect, spaPackage, time }: CalendarProps) {

        //Hämtar helgdagar
        const { holidays, loading } = useHolidays();

        //Hämtar bokade tider
        const unavailableTimes = useBookedPackages(time, spaPackage);

        // Dagens datum
        const today = new Date()
        today.setHours(0, 0, 0, 0) // Nollställ tid för att jämföra endast datum

        //Visar max 14 månader framåt
        const maxDate = new Date()
        maxDate.setMonth(maxDate.getMonth() + 14)

        //Vilket datum är valt
        const [selectedDate, setSelectedDate] = useState<Date | null>(null)

        //Gör om datum till yyyy-mm-dd format
        const formatDate = (date: Date): string => {
            const year  = date.getFullYear()
            const month = String(date.getMonth() + 1).padStart(2, "0")
            const day   = String(date.getDate()).padStart(2, "0")
            return `${year}-${month}-${day}`
        }

        //Sparar valt datum och skickar det vidare till bookningspage
        const handleSelect = (value:unknown) => {
            const date = value as Date
            setSelectedDate(date)
            const formattedDate = formatDate(date)
            onDateSelect(formattedDate)
        }

        //Kollar om datum är en måndag eller helgdag
        const isDisabled = ({ date }: { date: Date}): boolean => {
            const isMonday = date.getDay() === 1
            const isHoliday = holidays.includes(formatDate(date))
            const isUnavailable = unavailableTimes.includes(formatDate(date))
            return isMonday || isHoliday || isUnavailable
        }

        if (loading){
            return(
                <section className="calendar-page">
                    <div className="spinner-wrapper">
                        <div className="lds-grid">
                            <div></div><div></div><div></div>
                            <div></div><div></div><div></div>
                            <div></div><div></div><div></div>
                        </div>
                        <p className="loading-text">Laddar tillgängliga datum...</p>
                    </div>
                </section>
            )
        }

        return(
            <section className="calendar-page">

                <h2 className="calendar-title">VÄLJ ETT DATUM</h2>
                <p className="calendar-sub">Välj en ledig dag för din bokning</p>

                <ReactCalendar
                  onChange= {handleSelect}
                  value={selectedDate}
                  minDate={today}
                  maxDate={maxDate}
                  tileDisabled={isDisabled}
                  locale="sv-SE"
                  minDetail="month"
                  className="calendar"
                />

                {/* Visar valt datum under kalendern */}
                {selectedDate && (
                    <p className="selected-date">
                        Valt: {selectedDate.toLocaleDateString("sv-SE", {
                            year: "numeric",
                            month: "long",
                            weekday: "long",
                            day: "numeric"
                        })}
                    </p>
                )}
            </section>
        )
}

export default Calendar