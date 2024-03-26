import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

export default function EventDetails({convertTime, capitaliseFirstLetter, formatPrice, formatDate}){
    
    const { id } = useParams()
    const [event, setEvent] = useState()
    const [venue, setVenue] = useState()

    

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
        if (event) {
            getVenue()
        }
    }, [event])

    if (!event || !venue) {
        return <h1>Loading...</h1>
    } else {
        return (
            <div className='event-wrapper'>
                <div className='event-heading'>
                    <h2>{event.name}</h2>
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
                            <div>{formatDate(event.date)}</div>
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