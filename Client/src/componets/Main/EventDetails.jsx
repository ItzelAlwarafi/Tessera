import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

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

    const formatPrice = (price) => {
        return price.toLocaleString('en-US', {style: 'currency', currency: 'USD'})
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
            <div className='event-wrapper'>
                <div className='event-heading'>
                    <h3>{event.name}</h3>
                    <h5>{capitaliseFirstLetter(event.venue_type)}</h5>
                </div>
                <img alt={event.name} src={event.image_url} />
                <div className='event-details'>
                    <div className='event-row'>
                        <div className='event-venue-location'>
                            <dl>
                                <dt><Link to={`/venues/${venue.id}`} >{venue.name}</Link></dt>
                                <dd>{venue.address}</dd>
                            </dl>
                        </div>
                        <div className='event-date'>
                            <div>{date}</div>
                        </div>
                    </div>
                    <div className='event-row'>
                        <div className='event-doors'>
                            <dl>
                                <dt>Doors open</dt>
                                <dd>{convertTime(event.door_time)}</dd>
                            </dl>
                        </div>
                        <div className='event-ga'>
                            <dl>
                                <dt>GA price</dt>
                                <dd>{formatPrice(event.ga_price)}</dd>
                            </dl>
                        </div>
                    </div>
                    <div className='event-row'>
                        <div className='event-start'>
                            <dl>
                                <dt>Start time</dt>
                                <dd>{convertTime(event.start_time)}</dd>
                            </dl>
                        </div>
                        <div className='event-vip'>
                            <dl>
                                <dt>VIP price</dt>
                                <dd>{formatPrice(event.vip_price)}</dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}