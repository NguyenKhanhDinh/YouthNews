import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import EducationPage from './pages/EducationPage'
import { Route, Routes } from 'react-router-dom'
import './App.css'

function App() {
    return (
        <div className="app">
            <Header />
            <main className="app__main">
                <Routes>
                    <Route path="/" element={<EducationPage />} />
                    <Route path="*" element={<EducationPage />} />
                </Routes>
            </main>
            <Footer />
        </div>
    )
}

export default App