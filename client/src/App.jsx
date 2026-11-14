import Header from './components/header/Header'
import Footer from './components//footer/Footer'
import EducationPage from './pages/EducationPage'
import AuthLayout from './pages/AuthLayout'
import Login from './pages/Login'
import Register from './pages/Register'
import SearchPage from './pages/SearchPage'
import ArticleDetailPage from './pages/ArticleDetailPage'
import ForgotPassword from './pages/ForgotPassword'
import './App.css'
import {Route, Routes} from "react-router-dom";
import BackToTop from './components/BackToTop'

function App() {
    return (
        <div className="app">
            <Header />
            <main className="app__main">
                <Routes>
                    <Route path="/" element={<EducationPage />} />
                    <Route path="/chuyen-muc/giao-duc" element={<EducationPage />} />
                    <Route path="/tim-kiem" element={<SearchPage />} />
                    <Route path="/bai-viet/:slug" element={<ArticleDetailPage />} />
                    <Route element={<AuthLayout />}>
                        <Route path="/dang-nhap" element={<Login />} />
                        <Route path="/dang-ky" element={<Register />} />
                    </Route>
                    <Route path="/quen-mat-khau" element={<ForgotPassword />} />
                    <Route path="*" element={<EducationPage />} />
                </Routes>
            </main>
            <Footer />
            <BackToTop />
        </div>
    )
}

export default App