import { useRef } from "react"



export default function CreateEvents(){

    const venue=useRef()
    const date = useRef()
    const doors_open = useRef()
    const start_time =useRef()
    const ga_price = useRef()
    const vip_price = useRef()

    const handleSubmit = (event)=> {
        event.preventDefault()

               const formData = {
                venue: venue.current.value,
                date: date.current.valuea,
                doors_open: doors_open.current.value,
                start_time: start_time.current.value,
                ga_price:ga_price.current.value,
                vip_price: vip_price.current.value
               }
               console.log(formData)

    }


    return(

     <div className="FormContainer">
         
         <form className="form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Venue" ref={venue}> </input>
            <input type="date" placeholder="Date " ref={date}> </input>
            <input type="time" id="doors_open" ref={doors_open}></input>
            <input type="time" id="start_time" ref={start_time}></input>
            <input type="number" id="ga_price" ref={ga_price}></input>
            <input type="number" id="vip_price" ref={vip_price}></input>

            <button id='createEventbtn' className="btn" type="submit">Submit</button>
         </form>


     </div>
    )
}