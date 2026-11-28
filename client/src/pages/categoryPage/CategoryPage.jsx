import { useState } from 'react'
import { useParams } from 'react-router-dom'
import CategoryNewsPage from '../../components/categoryNews/CategoryNewsPage'
import NotFoundPage from '../notFoundPage/NotFoundPage'
import { api, useApi } from '../../api'
import '../educationPage/EducationPage.css'
import '../HomePage/HomePage.css'

export default function CategoryPage() {
    const { slug, sub } = useParams()
    return <CategoryPageContent key={`${slug}:${sub ?? ''}`} slug={slug} subSlug={sub} />
}

function CategoryPageContent({ slug, subSlug }) {
    const categoriesState = useApi(api.getCategories)
    const articlesState = useApi(api.getArticles, {
        category: slug,
        sub: subSlug,
        page: 1,
        limit: 4,
    })
    const [page, setPage] = useState(1)
    const [additionalArticles, setAdditionalArticles] = useState([])
    const [hasMore, setHasMore] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)
    const [loadMoreError, setLoadMoreError] = useState(null)

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

    const subCategory = subSlug
        ? category.subCategories.find((item) => item.slug === subSlug)
        : null
    if (subSlug && !subCategory) return <NotFoundPage />

    const loadMore = async () => {
        const canLoadMore = page === 1 ? articlesState.data?.hasMore : hasMore
        if (!canLoadMore || loadingMore) return

        setLoadingMore(true)
        setLoadMoreError(null)
        try {
            const nextPage = page + 1
            const result = await api.getArticles({
                category: slug,
                sub: subSlug,
                page: nextPage,
                limit: 4,
            })
            setAdditionalArticles((current) => [...current, ...result.items])
            setPage(nextPage)
            setHasMore(result.hasMore)
        } catch (loadError) {
            setLoadMoreError(loadError)
        } finally {
            setLoadingMore(false)
        }
    }

    const articles = [...articlesState.data.items, ...additionalArticles]
    const topics = category.subCategories
    const canLoadMore = page === 1 ? articlesState.data.hasMore : hasMore

    return (
        <CategoryNewsPage
            categorySlug={slug}
            name={category.name}
            eyebrow={category.eyebrow ?? 'YouthNews · Chuyên mục'}
            intro={category.intro ?? `Tin tức ${category.name.toLowerCase()} mới nhất, được cập nhật liên tục.`}
            topics={topics}
            articles={articles}
            selectedSubCategory={subCategory}
            onLoadMore={loadMore}
            hasMore={canLoadMore}
            loadingMore={loadingMore}
            loadMoreError={loadMoreError}
        />
    )
}