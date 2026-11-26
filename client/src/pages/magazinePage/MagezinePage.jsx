import { Link } from 'react-router-dom'
import { api, useApi } from '../../api'
import '../educationPage/EducationPage.css'
import '../HomePage/HomePage.css'
import './MagazinePage.css'

function MagCard({ item, featured = false }) {
    return (
        <article className={`mag-card${featured ? ' mag-card--featured' : ''}`}>
            <Link to={`/magazine/${item.slug}`} className="mag-card__img" aria-label={`Đọc: ${item.title}`}>
                <img src={item.cover} alt="" loading={featured ? 'eager' : 'lazy'} />
            </Link>
            <div className="mag-card__body">
                <span className="education-label">{item.category}</span>
                <h2><Link to={`/magazine/${item.slug}`}>{item.title}</Link></h2>
                <p>{item.deck}</p>
                <p className="mag-card__meta">{item.date} · {item.readTime} phút đọc</p>
            </div>
        </article>
    )
}

export default function MagazinePage() {
    const { data, loading, error, refetch } = useApi(api.getMagazines)

    return (
        <div className="education-page">
            <div className="education-page__container">
                <div className="education-page__breadcrumb">
                    <Link to="/">Trang chủ</Link>
                    <span>/</span>
                    <span>Magazine</span>
                </div>

                <h1 className="mag-page__title">Magazine</h1>
                <p className="mag-page__lead">Những câu chuyện dài hơi, đọc chậm và đọc sâu.</p>

                {error && (
                    <div className="home-error" role="alert">
                        <p>{error.message || 'Không tải được danh sách bài.'}</p>
                        <button type="button" onClick={refetch}>Thử lại</button>
                    </div>
                )}

                {loading && <p role="status" aria-busy="true">Đang tải…</p>}

                {data && data.length > 0 && (
                    <>
                        <MagCard item={data[0]} featured />
                        {data.length > 1 && (
                            <div className="mag-page__grid">
                                {data.slice(1).map((m) => (
                                    <MagCard key={m.slug} item={m} />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
