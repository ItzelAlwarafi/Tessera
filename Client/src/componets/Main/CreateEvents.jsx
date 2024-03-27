import React, { useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

export default function CreateEvents() {
  const { id } = useParams() 

  const formInitialState = {
    venue_id: id, 
    name: "",
    venue_type: "",
    date: "",
    door_time: "",
    start_time: "",
    ga_price: "",
    vip_price: "",
    image_url: ""
  }

  const handleChange = (event) => {
    const { id, value } = event.target
    setFormState({ ...formState, [id]: value })
  }


  const [formState, setFormState] = useState(formInitialState)

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const formDataJson = {
        venue_id: formState.venue_id,
        name: formState.name,
        venue_type: formState.venue_type,
        date: formState.date,
        door_time: formState.door_time,
        start_time: formState.start_time,
        ga_price: formState.ga_price,
        vip_price: formState.vip_price,
        image_url: formState.image_url
      }
      console.log(formDataJson)

      const response = await axios.post("http://localhost:8000/events/", formDataJson)
      console.log("form submitted", response.data)
    } catch (error) {
      console.log("Error posting data ", error)
    }
  }

  return (
    <div className="FormContainer">
      <h3>Add Event</h3>
      <form onSubmit={handleSubmit}>
        <div className="form">
          <input type="text" id="name" placeholder="Event Name" value={formState.name} onChange={handleChange}></input>
          <input type="text" id="venue_type" placeholder="Venue Type" value={formState.venue_type} onChange={handleChange}></input>
          <label>Date of event:</label>
          <input type="date" id="date" value={formState.date} onChange={handleChange}></input>
          <label>Doors open time:</label>
          <input type="time" id="door_time" value={formState.door_time} onChange={handleChange}></input>
          <label>Show start time:</label>
          <input type="time" id="start_time" value={formState.start_time} onChange={handleChange}></input>
          <label>Ticket prices:</label>
          <div className="prices">
            <input type="number" id="ga_price" min="0" placeholder="GA Price" value={formState.ga_price} onChange={handleChange}></input>
            <input type="number" id="vip_price" min="0" placeholder="VIP Price" value={formState.vip_price} onChange={handleChange}></input>
          </div>
          <input type="text" id="image_url" placeholder="Image" value={formState.image_url} onChange={handleChange}></input>
        </div>
        <button id="createEventbtn" className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}

