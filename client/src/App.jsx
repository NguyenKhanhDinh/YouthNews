import Header from './components/header/Header'
import Footer from './components//footer/Footer'
import EducationPage from './pages/EducationPage'
import AuthLayout from './pages/AuthLayout'
import Login from './pages/Login'
import Register from './pages/Register'
import './App.css'
import {Route, Routes} from "react-router-dom";

function App() {
    return (
        <div className="app">
            <Header />
            <main className="app__main">
                <Routes>
                    <Route path="/" element={<EducationPage />} />
                    <Route path="/chuyen-muc/giao-duc" element={<EducationPage />} />
                    <Route element={<AuthLayout />}>
                        <Route path="/dang-nhap" element={<Login />} />
                        <Route path="/dang-ky" element={<Register />} />
                    </Route>
                    <Route path="*" element={<EducationPage />} />
                </Routes>
            </main>
            <Footer />
        </div>
    )
}

export default App