import { useState } from 'react'
import { Link } from 'react-router-dom'
import { api, useApi } from '../api'
import ArticleCard from '../components/article/ArticleCard'
import { getSavedArticleSlugs } from '../utils/bookmarks'
import useDocumentTitle from '../hooks/useDocumentTitle'
import './educationPage/EducationPage.css'
import './SavedArticlesPage.css'

export default function SavedArticlesPage() {
    const [{ savedSlugs, bookmarkError }] = useState(() => {
        try {
            return { savedSlugs: getSavedArticleSlugs(), bookmarkError: null }
        } catch (error) {
            return { savedSlugs: [], bookmarkError: error }
        }
    })
    const articlesState = useApi(api.getArticles, { page: 1, limit: 100 })

    useDocumentTitle('Tin đã lưu')

    const loading = articlesState.loading
    const error = bookmarkError || articlesState.error
    const savedArticles = !loading && !error
        ? articlesState.data.items.filter((article) => savedSlugs.includes(article.slug))
        : []

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
                        <p className="saved-articles__count" aria-live="polite">
                            {savedArticles.length} bài viết
                        </p>
                        <div className="article-list">
                            {savedArticles.map((article) => (
                                <ArticleCard article={article} key={article.slug} />
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