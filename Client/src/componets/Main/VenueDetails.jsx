import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import CreateEvents from './CreateEvents'
export default function VenueDetails(){

    const { id } = useParams()
    const [venue, setVenue] = useState()

    useEffect(() => {
        const getVenue = async() => {
            const response = await axios.get(`http://localhost:8000/venues/${id}`)
            setVenue(response.data)
        }
        getVenue()
    }, [])

    const navigate = useNavigate()

    const showEvent = (event) => {
        navigate(`/events/${event}`)
    }

    if (!venue) {
        return <h1>Loading...</h1>
    } else {
        return (
            
           
            <div>
                <h1>{venue.name}</h1>
                <img alt={venue.name} src={venue.image_url} />
                <h5>{venue.address}</h5>
                <dl>
                    <dt>Max capacity</dt>
                    <dd>{venue.capacity}</dd>

                    <dt>Point of contact</dt>
                    <dd>{venue.poc_name}</dd>
                    <dd>{venue.poc_email}</dd>
                </dl>

                <h3>Events at this venue:</h3>
                { venue.events.map(event => (
                        <div className='event-card' key={event.id} onClick={() => showEvent(event.id)} >
                            <img alt={event.name} src={event.image_url} />
                            <h3>{event.name}</h3>
                            <h5>{event.date}</h5>
                            <h5>${event.ga_price}</h5>
                        </div>
                    ))}
                   
              <CreateEvents/>
            </div>
           
             
        )
    }
}