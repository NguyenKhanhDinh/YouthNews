import { Link, useSearchParams } from 'react-router-dom'
import ArticleCard from '../components/article/ArticleCard'
import { articles } from '../data/articles'
import './EducationPage.css'

function normalizeText(text) {
    return text
        .toLocaleLowerCase('vi')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
}

export default function SearchPage() {
    const [searchParams] = useSearchParams()
    const query = searchParams.get('q')?.trim() ?? ''
    const normalizedQuery = normalizeText(query)
    const results = normalizedQuery
        ? articles.filter((article) =>
            [article.title, article.summary, article.category]
                .some((value) => normalizeText(value).includes(normalizedQuery)),
        )
        : []

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

                {query && (
                    <p className="education-page__intro" aria-live="polite">
                        Từ khóa “{query}” · {results.length} kết quả
                    </p>
                )}

                {!query ? (
                    <p role="status">Vui lòng nhập từ khóa vào ô tìm kiếm phía trên.</p>
                ) : results.length > 0 ? (
                    <div className="article-list">
                        {results.map((article) => (
                            <ArticleCard article={article} key={article.slug} />
                        ))}
                    </div>
                ) : (
                    <p role="status">Không tìm thấy bài viết phù hợp với từ khóa “{query}”.</p>
                )}
            </div>
        </div>
    )
}
