import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import CategoryPage from './pages/categoryPage/CategoryPage'
import AuthLayout from './pages/AuthLayout'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import SearchPage from './pages/SearchPage'
import HomePage from './pages/HomePage/HomePage.jsx'
import ArticleDetailPage from './pages/articleDetailPage/ArticleDetailPage'
import SavedArticlesPage from './pages/SavedArticlesPage'
import ForgotPassword from './pages/ForgotPassword'
import NotFoundPage from './pages/notFoundPage/NotFoundPage'
import VideoPage from './pages/videoPage/VideoPage'
import VideoDetailPage from './pages/videoPage/VideoDetailPage'
import PodcastPage from "./pages/podcastPage/PodcastPage.jsx";
import PodcastDetailPage from "./pages/podcastPage/PodcastDetailPage.jsx";
import MagazinePage from "./pages/magazinePage/MagezinePage.jsx";
import MagazineDetailPage from "./pages/magazinePage/MagazineDetailPage.jsx";
import './App.css'
import {Route, Routes} from "react-router-dom";
import BackToTop from './components/backToTop/BackToTop'

function App() {
    return (
        <div className="app">
            <Header />
            <main className="app__main">
                <Routes>
                    <Route path = "/" element={<HomePage />} />
                    <Route path="/chuyen-muc/:slug/:sub" element={<CategoryPage />} />
                    <Route path="/chuyen-muc/:slug" element={<CategoryPage />} />
                    <Route path="/video" element={<VideoPage />} />
                    <Route path="/video/:slug" element={<VideoDetailPage />} />
                    <Route path="/podcast" element={<PodcastPage />} />
                    <Route path="/podcast/:slug" element={<PodcastDetailPage />} />
                    <Route path="/magazine" element={<MagazinePage />} />
                    <Route path="/magazine/:slug" element={<MagazineDetailPage />} />
                    <Route path="/tim-kiem" element={<SearchPage />} />
                    <Route path="/bai-viet/:slug" element={<ArticleDetailPage />} />
                    <Route path="/tin-da-luu" element={<SavedArticlesPage />} />
                    <Route element={<AuthLayout />}>
                        <Route path="/dang-nhap" element={<Login />} />
                        <Route path="/dang-ky" element={<Register />} />
                    </Route>
                    <Route path="/quen-mat-khau" element={<ForgotPassword />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>
            <Footer />
            <BackToTop />
        </div>
    )
}

export default App