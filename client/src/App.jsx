import Header from './components/Header'
import Footer from './components/Footer'
import EducationPage from './pages/EducationPage'
import './App.css'

function App() {
    return (
        <div className="app">
            <Header />
            <main className="app__main">
                <EducationPage />
            </main>
            <Footer />
        </div>
    )
}

export default App