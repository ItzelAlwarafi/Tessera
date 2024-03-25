import { Routes, Route } from 'react-router-dom'
import Venues from './Main/Venues'
import VenueDetails from './Main/VenueDetails'
import EventDetails from './Main/EventDetails'

export default function Main(){
    return(
        <div>
            <Routes>
                <Route path='/' element={<Venues />} />
                <Route path='/venues/:id' element={<VenueDetails />} />
                <Route path='/events/:id' element={<EventDetails />} />
            </Routes>
        </div>
    )
}