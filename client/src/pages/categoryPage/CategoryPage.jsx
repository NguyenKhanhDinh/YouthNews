import { useParams } from 'react-router-dom'
import CategoryNewsPage from '../../components/categoryNews/CategoryNewsPage'
import NotFoundPage from '../notFoundPage/NotFoundPage'
import { api, useApi } from '../../api'
import '../educationPage/EducationPage.css'
import '../HomePage/HomePage.css'

export default function CategoryPage() {
    const { slug } = useParams()
    const categoriesState = useApi(api.getCategories)
    const articlesState = useApi(api.getArticles, { category: slug, limit: 100 })

    const loading = categoriesState.loading || articlesState.loading
    const error = categoriesState.error || articlesState.error

    const retry = () => {
        categoriesState.refetch()
        articlesState.refetch()
    }

    if (loading) {
        return (
            <div className="education-page">
                <div className="education-page__container">
                    <p role="status" aria-busy="true">Đang tải tin tức…</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="education-page">
                <div className="education-page__container">
                    <div className="home-error" role="alert">
                        <p>{error.message || 'Đã có lỗi xảy ra.'}</p>
                        <button type="button" onClick={retry}>Thử lại</button>
                    </div>
                </div>
            </div>
        )
    }

    const category = categoriesState.data.find((c) => c.slug === slug)
    if (!category) return <NotFoundPage />

    const articles = articlesState.data.items
    if (articles.length === 0) {
        return (
            <div className="education-page">
                <div className="education-page__container">
                    <p role="status">Chưa có bài viết nào thuộc chuyên mục {category.name}.</p>
                </div>
            </div>
        )
    }

    return (
        <CategoryNewsPage
            key={slug}
            name={category.name}
            eyebrow={category.eyebrow ?? 'YouthNews · Chuyên mục'}
            intro={category.intro ?? `Tin tức ${category.name.toLowerCase()} mới nhất, được cập nhật liên tục.`}
            topics={category.subCategories}
            articles={articles}
        />
    )
}