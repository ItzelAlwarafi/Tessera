import { Routes, Route } from 'react-router-dom'
import Venues from './Main/Venues'
import VenueDetails from './Main/VenueDetails'
import EventDetails from './Main/EventDetails'

export default function Main(){

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

    const formatDate = (date) => {
        const formattedDate = new Date(date)
        const dateOptions = {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
        return formattedDate.toLocaleDateString("en-US", dateOptions)
    }

    const formatNumber = (number) => {
        return new Intl.NumberFormat('en-US').format(number)
    }

    return(
        <div className='main'>
            <Routes>
                <Route path='/' element={<Venues />} />
                <Route path='/venues/:id' element={<VenueDetails formatDate={formatDate} formatNumber={formatNumber} formatPrice={formatPrice} />} />
                <Route path='/events/:id' element={<EventDetails capitaliseFirstLetter={capitaliseFirstLetter} formatDate={formatDate} formatPrice={formatPrice} convertTime={convertTime} />} />
            </Routes>
        </div>
    )
}