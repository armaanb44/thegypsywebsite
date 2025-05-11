import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function PaymentPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { dates, guests, selectedRooms, contact } = location.state || {}

  useEffect(() => {
    if (!dates || !guests || !selectedRooms || !contact) {
      alert('Missing booking details. Please go back.')
      navigate('/booking')
      return
    }

    const loadRazorpay = () => {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => launchRazorpay()
      document.body.appendChild(script)
    }

    const launchRazorpay = () => {
      const total = calculateTotal(selectedRooms, dates)

      const options = {
        key: 'rzp_test_YourKeyHere', // replace with your Razorpay key
        amount: total * 100, // in paise
        currency: 'INR',
        name: 'The Gypsy Dehradun',
        description: 'Homestay Booking Payment',
        handler: function (response) {
          console.log('Payment success:', response)
          navigate('/confirmation', { state: { dates, guests, selectedRooms, contact, paymentId: response.razorpay_payment_id } })
        },
        prefill: {
          name: contact.name,
          email: contact.email,
          contact: contact.phone
        },
        theme: {
          color: '#f59e0b'
        }
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    }

    loadRazorpay()
  }, [dates, guests, selectedRooms, contact, navigate])

  const calculateTotal = (rooms, dates) => {
    const start = new Date(dates.checkIn)
    const end = new Date(dates.checkOut)
    const nights = []
    while (start < end) {
      nights.push(new Date(start))
      start.setDate(start.getDate() + 1)
    }

    const isWeekend = (date) => {
      const day = date.getDay()
      return day === 0 || day === 5 || day === 6
    }

    let grandTotal = 0

    rooms.forEach(room => {
      let subtotal = 0
      nights.forEach(date => {
        subtotal += isWeekend(date) ? room.priceWeekend : room.priceWeekday
      })
      const tax = Math.round(subtotal * 0.18)
      grandTotal += subtotal + tax
    })

    return grandTotal
  }

  return (
    <div className="h-screen bg-lime-900 flex items-center justify-center text-white px-4">
      <p className="text-xl">Redirecting to secure Razorpay checkout...</p>
    </div>
  )
}