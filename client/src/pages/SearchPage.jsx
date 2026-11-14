import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import ArticleCard from '../components/article/ArticleCard'
import { articles } from '../data/articles'
import './educationPage/EducationPage.css'

function normalizeText(text) {
    return text
        .toLocaleLowerCase('vi')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
}

export default function SearchPage() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const query = searchParams.get('q')?.trim() ?? ''
    const [keyword, setKeyword] = useState(query)

    const normalizedQuery = normalizeText(query)
    const results = normalizedQuery
        ? articles.filter((article) =>
            [article.title, article.summary, article.category]
                .some((value) => normalizeText(value).includes(normalizedQuery)),
        )
        : []

    const handleSubmit = (e) => {
        e.preventDefault()
        const q = keyword.trim()
        if (!q) return
        navigate(`/tim-kiem?q=${encodeURIComponent(q)}`)
    }

    return (
        <div className="education-page">
            <div className="education-page__container">
                <div className="education-page__breadcrumb">
                    <Link to="/">Trang chủ</Link>
                    <span>/</span>
                    <span>Tìm kiếm</span>
                </div>

                <section className="education-page__heading" aria-labelledby="search-title">
                    <div>
                        <p className="education-page__eyebrow">YouthNews · Tra cứu tin tức</p>
                        <h1 id="search-title">Kết quả tìm kiếm</h1>
                    </div>
                </section>

                <form className="search-page__form" onSubmit={handleSubmit} role="search">
                    <input
                        type="search"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="Nhập từ khóa tìm kiếm..."
                        aria-label="Từ khóa tìm kiếm"
                    />
                    <button type="submit">Tìm kiếm</button>
                </form>

                {query && (
                    <p className="education-page__intro" aria-live="polite">
                        Từ khóa “{query}” · {results.length} kết quả
                    </p>
                )}

                {!query ? (
                    <div className="search-page__empty" role="status">
                        <p>Vui lòng nhập từ khóa vào ô tìm kiếm phía trên.</p>
                        <p className="search-page__hint">
                            Gợi ý: tuyển sinh, đại học, học bổng, kỳ thi...
                        </p>
                    </div>
                ) : results.length > 0 ? (
                    <div className="article-list">
                        {results.map((article) => (
                            <ArticleCard article={article} key={article.slug} />
                        ))}
                    </div>
                ) : (
                    <div className="search-page__empty" role="status">
                        <p>Không tìm thấy bài viết phù hợp với từ khóa “{query}”.</p>
                        <p className="search-page__hint">
                            Thử từ khóa ngắn hơn hoặc kiểm tra chính tả.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}