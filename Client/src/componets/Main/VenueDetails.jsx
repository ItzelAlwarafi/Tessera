import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import CreateEvents from './CreateEvents'

export default function VenueDetails({formatDate, formatNumber, formatPrice}){

    const { id } = useParams()
    const [venue, setVenue] = useState()

    const scrollToCreate = () => {
        const create = document.getElementById('create-event-form')
        create.scrollIntoView()
    }

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

            
            <div className='venue-details-wrapper'>
                <div className='create-event-button'>
                    <button onClick={scrollToCreate} >Add event</button>
                </div>
                
                <img alt={venue.name} src={venue.image_url} />
                <div className='venue-details'>
                    <div className='venue-row'>
                        <div className='venue-name-address'>
                            <h2>{venue.name}</h2>
                            <h5>{venue.address}</h5>
                        </div>
                        <div className='venue-capacity'>
                            <dl>
                                <dt className='max-cap'>Max capacity</dt>
                                <dd>{formatNumber(venue.capacity)}</dd>
                            </dl>
                        </div>
                    </div>
                    <div className='venue-row-contact'>
                        <div className='venue-contact-heading'>
                            <h2>Contact</h2>
                        </div>
                        <div className='venue-contact-details'>
                            <div className='venue-contact-name'>{venue.poc_name}</div>
                            <div className='venue-contact-email'>{venue.poc_email}</div>
                        </div>
                    </div>
                </div>



                <div className='event-cards-wrapper'>
                    { venue.events.map(event => (
                        <div className='event-card' key={event.id} onClick={() => showEvent(event.id)} >
                            <img alt={event.name} src={event.image_url} />
                            <div className='event-card-details'>
                                <div className='event-card-name-location'>
                                    <h3>{event.name}</h3>
                                   
                                </div>
                                <div className='event-card-price'>
                                    <h3>{formatDate(event.date)}</h3>
                                    <h5>{formatPrice(event.ga_price)}</h5>
                                </div>
                            </div>
                        </div>
                    ))}

                   


                </div>
                <div className='create-event-wrapper' id='create-event-form' >
                    <CreateEvents/>
                </div>

            </div>
           
             
        )
    }
}