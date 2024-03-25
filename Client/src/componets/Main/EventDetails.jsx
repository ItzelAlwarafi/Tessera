import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

export default function EventDetails(){
    
    const { id } = useParams()
    const [event, setEvent] = useState()
    const [venue, setVenue] = useState()
    const [date, setDate] = useState()

    const convertTime = (timeString) => {
        const [hours, minutes, seconds] = timeString.split(':').map(Number)
        const period = hours >= 12 ? 'pm': 'am'
        const hours12 = hours % 12 || 12
        const formattedTime = `${hours12}:${String(minutes).padStart(2, '0')} ${period}`
        return formattedTime
    }

    const capitaliseFirstLetter = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }

    useEffect(() => {
        const getEvent = async() => {
            const response = await axios.get(`http://localhost:8000/events/${id}`)
            setEvent(response.data)
        }
        getEvent()
    }, [])

    useEffect(() => {
        const getVenue = async() => {
            const response = await axios.get(event.venue)
            setVenue(response.data)
        }
        const dateOptions = {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
        if (event) {
            getVenue()
            const formattedDate = new Date(event.date)
            const localeDate = formattedDate.toLocaleDateString("en-US", dateOptions)
            setDate(localeDate)
        }
    }, [event])

    if (!event || !venue) {
        return <h1>Loading...</h1>
    } else {
        return (
            <div>
                <h1>{event.name}</h1>
                <img alt={event.name} src={event.image_url} />
                <div>{capitaliseFirstLetter(event.venue_type)}</div>
                <div>{venue.name}</div>
                <div>{date}</div>

                <dl>
                    <dt>Start time</dt>
                    <dd>{convertTime(event.start_time)}</dd>

                    { event.door_time ? <dt>Doors open</dt> : null}
                    { event.door_time ? <dd>{convertTime(event.door_time)}</dd> : null}

                    <dt>General Admission tickets</dt>
                    <dd>${event.ga_price}</dd>

                    { event.vip_price ? <dt>VIP tickets</dt> : null }
                    { event.vip_price ? <dd>${event.vip_price}</dd> : null }
                </dl>
            </div>
        )
    }
}