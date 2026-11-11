import Header from './components/Header'
import Footer from './components/Footer'
import EducationPage from './pages/EducationPage'
import Login from './pages/Login'
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
                    <Route path="/dang-nhap" element={<Login />} />
                    <Route path="*" element={<EducationPage />} />
                </Routes>
            </main>
            <Footer />
        </div>
    )
}

export default App