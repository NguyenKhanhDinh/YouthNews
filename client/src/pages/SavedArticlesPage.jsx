import { useState } from 'react'
import { Link } from 'react-router-dom'
import { api, useApi } from '../api'
import ArticleCard from '../components/article/ArticleCard'
import { clearSavedArticles, getSavedArticleSlugs, removeSavedArticle } from '../utils/bookmarks'
import useDocumentTitle from '../hooks/useDocumentTitle'
import './educationPage/EducationPage.css'
import './SavedArticlesPage.css'

function sortNewestSavedFirst(articles, savedSlugs) {
    const bySlug = new Map(articles.map((article) => [article.slug, article]))
    return [...savedSlugs].reverse().map((slug) => bySlug.get(slug)).filter(Boolean)
}

export default function SavedArticlesPage() {
    const [{ savedSlugs, bookmarkError }, setBookmarkState] = useState(() => {
        try {
            return { savedSlugs: getSavedArticleSlugs(), bookmarkError: null }
        } catch (error) {
            return { savedSlugs: [], bookmarkError: error }
        }
    })
    const [actionError, setActionError] = useState(null)
    const [initialSlugs] = useState(savedSlugs)
    const articlesState = useApi(api.getArticlesBySlugs, initialSlugs)

    useDocumentTitle('Tin đã lưu')

    const loading = articlesState.loading
    const error = bookmarkError || articlesState.error
    const savedArticles = !loading && !error
        ? sortNewestSavedFirst(articlesState.data, savedSlugs)
        : []

    const handleRemove = (slug) => {
        try {
            removeSavedArticle(slug)
            setBookmarkState((current) => ({
                ...current,
                savedSlugs: current.savedSlugs.filter((item) => item !== slug),
            }))
            setActionError(null)
        } catch (removeError) {
            setActionError(removeError)
        }
    }

    const handleClearAll = () => {
        if (!window.confirm('Bạn có chắc muốn xóa tất cả tin đã lưu?')) return
        try {
            clearSavedArticles()
            setBookmarkState((current) => ({ ...current, savedSlugs: [] }))
            setActionError(null)
        } catch (clearError) {
            setActionError(clearError)
        }
    }

    return (
        <div className="education-page saved-articles">
            <div className="education-page__container">
                <div className="education-page__breadcrumb">
                    <Link to="/">Trang chủ</Link>
                    <span aria-hidden="true">/</span>
                    <span aria-current="page">Tin đã lưu</span>
                </div>

                <section className="education-page__heading" aria-labelledby="saved-articles-title">
                    <div>
                        <p className="education-page__eyebrow">YouthNews · Cá nhân</p>
                        <h1 id="saved-articles-title">Tin đã lưu</h1>
                    </div>
                    <p className="education-page__intro">
                        Những bài viết bạn đã lưu trên thiết bị này.
                    </p>
                </section>

                {loading ? (
                    <p role="status" aria-busy="true">Đang tải tin đã lưu…</p>
                ) : error ? (
                    <div className="saved-articles__error" role="alert">
                        <p>{error.message || 'Không thể tải danh sách tin đã lưu.'}</p>
                        {articlesState.error && (
                            <button type="button" onClick={articlesState.refetch}>Thử lại</button>
                        )}
                    </div>
                ) : savedArticles.length > 0 ? (
                    <>
                        <div className="saved-articles__toolbar">
                            <p className="saved-articles__count" aria-live="polite">
                                {savedArticles.length} bài viết
                            </p>
                            <button
                                className="saved-articles__clear"
                                type="button"
                                onClick={handleClearAll}
                            >
                                Xóa tất cả
                            </button>
                        </div>
                        {actionError && (
                            <p className="saved-articles__action-error" role="alert">
                                {actionError.message}
                            </p>
                        )}
                        <div className="article-list">
                            {savedArticles.map((article) => (
                                <div className="saved-articles__item" key={article.slug}>
                                    <ArticleCard article={article} />
                                    <button
                                        className="saved-articles__remove"
                                        type="button"
                                        onClick={() => handleRemove(article.slug)}
                                    >
                                        Bỏ lưu
                                    </button>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="saved-articles__empty" role="status">
                        <h2>Chưa có bài viết nào được lưu</h2>
                        <p>Chọn “Lưu tin” trên bài viết để xem lại ở đây.</p>
                        <Link to="/">Khám phá tin mới</Link>
                    </div>
                )}
            </div>
        </div>
    )
}