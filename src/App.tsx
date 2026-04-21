import BookingPage from "./pages/BookingPage";
import LandingPage from "./pages/LandingPage";
import SpaOptionsPage from "./pages/SpaOptionsPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPage from "./pages/adminPage";




function App() {
  return (

    <BrowserRouter>
<Routes>
  <Route path="/" element={<LandingPage />} />
  <Route path="/packages" element={<SpaOptionsPage />} />
  <Route path="/confirmation/:id" element={<ConfirmationPage />} />
  <Route path="/bookingPage" element={<BookingPage />} />
  <Route path="/adminPage" element={<AdminPage />} />
</Routes>
</BrowserRouter>
  )
}

export default App;