import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function BookingReview() {
  const location = useLocation()
  const navigate = useNavigate()
  const { dates, guests, selectedRooms } = location.state || {}

  const [user, setUser] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialRequest: ''
  })

  if (!dates || !guests || !selectedRooms) {
    return <div className="p-6 text-red-500">Missing booking data. Please go back and select rooms.</div>
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

 const handleProceed = () => {
  if (!formData.name || !formData.email || !formData.phone) {
    alert("Please fill out all required contact information.")
    return
  }

  navigate('/paymentPage', {
    state: {
      dates,
      guests,
      selectedRooms,
      contact: user || formData
    }
  })
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

  const isWeekend = (date) => {
    const day = date.getDay()
    return day === 0 || day === 5 || day === 6 // Sunday, Friday, Saturday
  }

  const breakdownList = selectedRooms.map((room) => {
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

    return {
      name: room.name,
      weekday: breakdown.weekday,
      weekend: breakdown.weekend,
      priceWeekday: room.priceWeekday,
      priceWeekend: room.priceWeekend,
      tax,
      roomTotal
    }
  })

  const grandTotal = breakdownList.reduce((sum, r) => sum + r.roomTotal, 0)

  return (
<div className="h-screen bg-lime-900 overflow-y-auto px-4 py-10">
<div className="w-full max-w-md mx-auto bg-lime-800 p-6 rounded-lg shadow-lg text-white">
        <div className="flex items-center justify-center mb-6 space-x-3">
          <img
            src="/gypsytraillogo.jpg"
            alt="Gypsy Trail Logo"
            className="w-20 h-20 object-contain"
          />
          <h1 className="text-3xl font-bold text-amber-400">Review Booking</h1>
        </div>

        <div className="mb-6 text-sm">
          <h2 className="text-xl font-semibold mb-2">Booking Summary</h2>
          <p><strong>Check-In:</strong> {dates.checkIn.toLocaleDateString()}</p>
          <p><strong>Check-Out:</strong> {dates.checkOut.toLocaleDateString()}</p>
          <p><strong>Guests:</strong> {guests.adults} Adults, {guests.children} Children, {guests.infants} Infants</p>
          <ul className="list-disc ml-6 mt-2">
            {selectedRooms.map(room => (
              <li key={room.name}>{room.name}</li>
            ))}
          </ul>
        </div>

        <div className="mb-6 text-sm">
          <h2 className="text-xl font-semibold mb-2">Tariff Breakdown</h2>
          {breakdownList.map(room => (
            <div key={room.name} className="mb-3">
              <p className="font-semibold">{room.name}</p>
              <p>
                ₹{room.priceWeekday.toLocaleString()} × {room.weekday} weekday(s) +
                ₹{room.priceWeekend.toLocaleString()} × {room.weekend} weekend(s)
              </p>
              <p>+ Tax (18%): ₹{room.tax.toLocaleString()}</p>
              <p>Total: ₹{room.roomTotal.toLocaleString()}</p>
            </div>
          ))}
          <hr className="border-lime-600 my-2" />
          <p className="font-bold text-lg">Grand Total: ₹{grandTotal.toLocaleString()}</p>
        </div>

        {!user ? (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Guest Information</h2>

            <p className="mb-2">
              Already have an account?
              <button
                onClick={() => navigate('/login')}
                className="text-blue-400 underline ml-2"
              >Login</button>
            </p>

            <p className="mb-4">Or continue as guest:</p>

            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 rounded text-black border border-gray-300"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 rounded text-black border border-gray-300"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 rounded text-black border border-gray-300"
              />
              <textarea
                name="specialRequest"
                placeholder="Special Requests (optional)"
                value={formData.specialRequest}
                onChange={handleChange}
                className="w-full p-2 rounded text-black border border-gray-300"
              />
            </div>
          </div>
        ) : (
          <p className="mb-6">Logged in as <strong>{user.name}</strong></p>
        )}

        <button
          onClick={handleProceed}
          className="w-full bg-amber-500 text-black font-semibold py-2 rounded hover:bg-amber-600 transition"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  )
}
