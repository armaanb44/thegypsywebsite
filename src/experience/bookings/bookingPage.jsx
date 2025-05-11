import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useEffect } from 'react'



export default function BookingPage() {
  const [dates, setDates] = useState({ checkIn: null, checkOut: null })
  const [guests, setGuests] = useState({ adults: 1, children: 0, infants: 0 })
  const [selectedRooms, setSelectedRooms] = useState([])
  const [expandedRoom, setExpandedRoom] = useState(null)
  const [user, setUser] = useState(null) 
  const navigate = useNavigate()
  const checkOutRef = useRef(null)

  useEffect(() => {
  // Remove any rooms that are no longer eligible after guest update
  setSelectedRooms(prevSelected =>
    prevSelected.filter(room => isRoomEligible(room))
  )
}, [guests])

 const roomOptions = [
  {
    name: "Room in Doon",
    available: true,
    priceWeekday: 4100,
    priceWeekend: 4350,
  },
  {
    name: "Little Paradise",
    available: true,
    priceWeekday: 3100,
    priceWeekend: 3350,
  },
  {
    name: "Grand Escape",
    available: true,
    priceWeekday: 5100,
    priceWeekend: 5350,
  },
  {
    name: "Entire House",
    available: true,
    priceWeekday: 17000,
    priceWeekend: 19000,
  }
]

const roomNotes = {
  "Little Paradise": "Double Occupancy.",
  "Room in Doon": "Double Occupancy. Max 3 adults with extra bed (₹1300)",
  "Grand Escape": "Double Occupancy. Max 3 adults with extra bed (₹1300)",
  "Entire House": "6 adults. Max 8 adults with extra bed (₹2600)"
}


const isWeekend = (date) => {
  const day = date.getDay()
  return day === 0 || day === 5 || day === 6 // Sun, Fri, Sat
}

const getNights = (start, end) => {
  const nights = []
  const current = new Date(start)
  while (current < end) {
    nights.push(new Date(current))
    current.setDate(current.getDate() + 1)
  }
  return nights
}



  const toggleRoomExpand = (room) => {
    setExpandedRoom(prev => prev?.name === room.name ? null : room)
  }

  const toggleRoomSelection = (room) => {
    if (selectedRooms.some(r => r.name === room.name)) {
      setSelectedRooms(prev => prev.filter(r => r.name !== room.name))
    } else {
      setSelectedRooms(prev => [...prev, room])
    }
  }

  const isRoomSelected = (room) =>
    selectedRooms.some(r => r.name === room.name)

  const isRoomEligible = (room) => {
  const { adults, children, infants } = guests

  switch (room.name) {
    case "Little Paradise":
      return adults <= 2 && children === 0 && infants <= 1

    case "Room in Doon":
    case "Grand Escape":
      return adults <= 3 && children <= 1 && infants <= 1

    case "Entire House":
      return adults <= 8 && children <= 3 && infants <= 3

    default:
      return true
  }
}


  return (

   
  <div className="h-screen overflow-y-auto bg-lime-900 text-white">
  <div className="w-full max-w-3xl mx-auto px-4 py-8 relative">
    
    {/* Welcome Message Aligned Right Inside Centered Block */}
    <div className="flex justify-end mb-6 text-sm sm:text-base">
      {user ? (
        <span>
          Welcome, {user.name} | <button onClick={() => setUser(null)} className="underline">Logout</button>
        </span>
      ) : (
        <span>
          Welcome, Guest |<button onClick={() => navigate('/login')} className="underline">Login</button>

        </span>
      )}
    </div>

        <h1 className="text-4xl sm:text-5xl font-bold text-amber-500 mb-6 text-center">Book Your Stay</h1>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">At The Gypsy Dehradun</h2>

        


<div className="relative mb-6 px-4 sm:px-8">
  {/* Logo Top Right */}
  <div className="absolute -top-2 right-2 sm:-top-35 sm:right-6">
    <img
      src="/gypsylogo.jpeg"
      alt="The Gypsy Logo"
      className="h-16 w-auto sm:h-28"
    />
  </div>

  {/* Logo Top Left */}
  <div className="absolute -top-46 left-2 sm:-top-35 sm:left-1">
    <img
      src="/gypsytraillogo.jpg"
      alt="The Gypsy Trail Logo"
      className="h-14 w-auto sm:h-24"
    />
  </div>
</div>


{/* Date Picker */}
<div className="mb-8 grid gap-6 sm:grid-cols-[120px_1fr] items-start">
  <h3 className="text-3xl font-semibold whitespace-nowrap text-amber-500 mt-1 sm:mt-8">Dates</h3>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div className="flex flex-col">
      <label className="mb-1 font-medium">Check-In</label>
      <DatePicker
        selected={dates.checkIn ? new Date(dates.checkIn) : null}
        onChange={(date) => {
          setDates({ ...dates, checkIn: date })

          // Auto-focus + open checkout calendar
          setTimeout(() => {
            if (checkOutRef.current) checkOutRef.current.setFocus()
          }, 100)
        }}
        minDate={new Date()}
        dateFormat="yyyy-MM-dd"
        className="w-full border p-2 rounded text-black"
        placeholderText="Select check-in date"
      />
    </div>

    <div className="flex flex-col">
      <label className="mb-1 font-medium">Check-Out</label>
      <DatePicker
        selected={dates.checkOut ? new Date(dates.checkOut) : null}
        onChange={(date) => setDates({ ...dates, checkOut: date })}
        minDate={dates.checkIn || new Date()}
        dateFormat="yyyy-MM-dd"
        className="w-full border p-2 rounded text-black"
        placeholderText="Select check-out date"
        ref={checkOutRef}
      />
    </div>
  </div>
</div>


        {/* Guests */}
<div className="mb-8 grid gap-6 sm:grid-cols-[120px_1fr] items-start">
  <h3 className="text-3xl font-semibold whitespace-nowrap text-amber-500 -mt-3 sm:mt-8">Guests</h3>

  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    {[
      { label: "Adults", note: "Ages 13 or above", key: "adults", min: 1, max: 8 },
      { label: "Children", note: "Ages 2–12", key: "children", min: 0, max: 3 },
      { label: "Infants", note: "Under 2 years", key: "infants", min: 0, max: 3 }
    ].map(({ label, note, key, min, max }) => (
      <div className="flex flex-col bg-lime-800 p-4 rounded" key={key}>
        <label className="mb-1 font-medium">{label}</label>
        <span className="text-sm text-gray-300 mb-3">{note}</span>

        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              setGuests((prev) => ({
                ...prev,
                [key]: Math.max(prev[key] - 1, min)
              }))
            }
            className="bg-black text-white px-3 py-1 rounded disabled:opacity-50"
            disabled={guests[key] <= min}
          >
            −
          </button>

          <span className="text-lg font-semibold w-6 text-center">{guests[key]}</span>

          <button
            onClick={() =>
              setGuests((prev) => ({
                ...prev,
                [key]: Math.min(prev[key] + 1, max)
              }))
            }
            className="bg-amber-500 text-black px-3 py-1 rounded hover:bg-amber-600 transition disabled:opacity-50"
            disabled={guests[key] >= max}
          >
            +
          </button>
        </div>
      </div>
    ))}
  </div>
</div>


        {/* Search Button */}
        <div className="text-right mt-4">
          <button
            className="bg-amber-500 text-black font-semibold px-6 py-2 rounded hover:bg-amber-600 transition"
            onClick={() => console.log("Searching with:", { dates, guests })}
          >
            Search
          </button>
        </div>

        {/* Room Availability */}
        <div className="mb-8">
          <h3 className="font-semibold text-amber-500 text-2xl mb-4">Room Availability</h3>

           {/* Conditional message if Little Paradise is available but not eligible */}
  {roomOptions.some(r => r.name === "Little Paradise" && r.available) &&
    !isRoomEligible(roomOptions.find(r => r.name === "Little Paradise")) && (
      <p className="text-red-300 text-sm mb-4">
        ❌ Little Paradise is only available for 2 adults and 1 infant max. It has been hidden based on your guest selection.
      </p>
  )}

          <ul className="space-y-4">
            {roomOptions
  .filter(room => room.available && isRoomEligible(room))
  .map((room) => {
              const isExpanded = expandedRoom?.name === room.name
              const isSelected = isRoomSelected(room)
              const tax = Math.round(room.price * 0.18)

 
              

              return (

                
                
                <li key={room.name} className="bg-lime-800 rounded overflow-hidden transition-all duration-300">
                    
                  <div className="flex justify-between items-center px-4 py-3">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleRoomSelection(room)}
                        disabled={!room.available}
                        className="w-5 h-5 accent-amber-500"
                      />
                      <div>
                        <p className="font-semibold">{room.name}</p>
                        <p className="text-xs text-gray-300">{roomNotes[room.name]}</p>
                        <p className="text-sm">
                          {room.available ? "✅ Available" : "❌ Booked"}
                        </p>
                      </div>
                    </div>
                    {room.available && (
                      <button
                        className="bg-black px-4 py-2 rounded hover:bg-gray-800 transition text-white"
                        onClick={() => toggleRoomExpand(room)}
                      >
                        {isExpanded ? "Hide" : "Show Price"}
                      </button>
                    )}
                  </div>

                  {isExpanded && room.available && (
                    <div className="bg-lime-900 px-4 pb-4 text-sm text-white">
                      <div className="border-t border-lime-700 pt-4 space-y-1">
                       {(() => {
  if (!dates.checkIn || !dates.checkOut) {
    return <p className="text-red-300">Please select both Check-In and Check-Out dates to view pricing.</p>
  }

  const nights = getNights(dates.checkIn, dates.checkOut)
  const breakdown = nights.reduce((acc, date) => {
    const isWknd = isWeekend(date)
    const rate = isWknd ? room.priceWeekend : room.priceWeekday
    acc.total += rate
    if (isWknd) acc.weekend++
    else acc.weekday++
    return acc
  }, { total: 0, weekday: 0, weekend: 0 })

  const tax = Math.round(breakdown.total * 0.18)
  const grandTotal = breakdown.total + tax

  return (
    <>
      <p>📅 Nights: {breakdown.weekday + breakdown.weekend}</p>
      <p>
        📦 Base Price: ₹{room.priceWeekday.toLocaleString()} × {breakdown.weekday} weekday(s) + 
        ₹{room.priceWeekend.toLocaleString()} × {breakdown.weekend} weekend(s)
      </p>
      <p>🧾 Tax (18%): ₹{tax.toLocaleString()}</p>
      <p className="font-bold">💰 Total: ₹{grandTotal.toLocaleString()}</p>
    </>
  )
})()}


                        <div className="mt-4">
                          <button
                            onClick={() => toggleRoomSelection(room)}
                            disabled={isSelected}
                            className={`px-4 py-2 rounded transition font-semibold 
                              ${isSelected ? "bg-gray-500 cursor-not-allowed" : "bg-amber-500 hover:bg-amber-600 text-black"}
                            `}
                          >
                            {isSelected ? "Already Selected" : `Select ${room.name}`}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>

        {/* Tariff Breakdown */}
{selectedRooms.length > 0 && (
  <div className="bg-lime-800 rounded p-4 mb-6 text-sm text-white">
    <h4 className="font-bold text-2xl mb-2">🧾 Booking Summary</h4>
    <p>
  <span className="font-medium text-1xl">Check-In:</span>{' '}
  {dates.checkIn ? dates.checkIn.toLocaleDateString() : '—'}
</p>
<p>
  <span className="font-medium text-1xl">Check-Out:</span>{' '}
  {dates.checkOut ? dates.checkOut.toLocaleDateString() : '—'}
</p>
    <div className="mt-2 space-y-2">
      {selectedRooms.map((room) => {
        const nights = getNights(dates.checkIn, dates.checkOut)
        const breakdown = nights.reduce((acc, date) => {
          const isWknd = isWeekend(date)
          const rate = isWknd ? room.priceWeekend : room.priceWeekday
          acc.total += rate
          if (isWknd) acc.weekend++
          else acc.weekday++
          return acc
        }, { total: 0, weekday: 0, weekend: 0 })

        const tax = Math.round(breakdown.total * 0.18)
        const roomTotal = breakdown.total + tax 

        return (
          <div key={room.name}>
            <p className="text-xs">
              ₹{room.priceWeekday} × {breakdown.weekday} weekday(s) + 
              ₹{room.priceWeekend} × {breakdown.weekend} weekend(s)
            </p>
            <p className="text-xs">+ Tax (18%): ₹{tax}</p>
            <p>Total for {room.name}: ₹{roomTotal}</p>
          </div>
        )
      })}
    </div>

    <hr className="my-2 border-lime-600" />

    <p className="font-bold text-2xl">
      Grand Total: ₹{
        selectedRooms.reduce((acc, room) => {
          const nights = getNights(dates.checkIn, dates.checkOut)
          const subtotal = nights.reduce((sum, night) => {
            const isWknd = isWeekend(night)
            const rate = isWknd ? room.priceWeekend : room.priceWeekday
            return sum + rate
          }, 0)
          const tax = Math.round(subtotal * 0.18)
          return acc + subtotal + tax 
        }, 0)
      }
    </p>
  </div>
)}


        {/* CTA */}
        <div className="text-center">
          <button
            disabled={selectedRooms.length === 0}
            onClick={() => {
              navigate('/bookingReview',{
                state: {dates, guests, selectedRooms}
              })
            }}
            className={`px-6 py-3 rounded transition font-semibold 
              ${selectedRooms.length === 0 ? "bg-gray-600 cursor-not-allowed text-white" : "bg-black text-white hover:bg-gray-800"}
            `}
          >
            Continue to Booking
          </button>
        </div>

        {/* Loyalty Info */}
        <div className="mt-6 text-sm text-center text-gray-300">
          Already a guest? <button onClick={() => navigate('/login')} className="underline">Login to earn points</button>

        </div>
      </div>
    </div>
  )
}
