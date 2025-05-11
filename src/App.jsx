import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './experience/bookings/loginPage'
import CreateAccountPage from './experience/bookings/createAccountPage'
import ForgotPasswordPage from './experience/bookings/forgotPasswordPage'
import Experience from './Experience'
import BookingPage from './experience/bookings/bookingPage'
import BookingReview from './experience/bookings/bookingReviewPage'
import PaymentPage from './experience/bookings/paymentPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Experience />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<CreateAccountPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/bookingReview" element={<BookingReview />} />
        <Route path="/paymentPage" element={<PaymentPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
