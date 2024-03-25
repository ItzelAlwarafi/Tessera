import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Venues(){

    const [venues, setVenues] = useState([])

    useEffect(() => {
        const getVenues = async() => {
            const response = await axios.get('http://localhost:8000/venues')
            setVenues(response.data)
        }
        getVenues()
    }, [])

    const navigate = useNavigate()

    const showVenue = (venue) => {
        navigate(`/venues/${venue}`)
    }

    if (!venues) {
        return <h1>Getting venues...</h1>
    } else {
        return (
            <div>
                <h1>Venues</h1>
                <div className='venues-wrapper'>
                    {venues.map(venue => (
                        <div className='venue-card' key={venue.id} onClick={() => showVenue(venue.id)} >
                            <img alt={venue.name} src={venue.image_url} />
                            <h3>{venue.name}</h3>
                            <h5>{venue.address}</h5>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}