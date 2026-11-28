import {Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import ArticleCard from '../../components/article/ArticleCard'
import AdSlot from '../../components/ads/AdSlot'
import { api, useApi } from '../../api'
import '../educationPage/EducationPage.css'
import './HomePage.css'

const articlePath = (a) => `/bai-viet/${a.slug}`
const categoryPath = (slug) => `/chuyen-muc/${slug}`

function Skeleton() {
    return (
        <div className="home-skeleton" aria-busy="true" aria-label="Đang tải trang chủ">
            <div className="home-skeleton__hero">
                <div className="home-skeleton__block home-skeleton__block--lg" />
                <div className="home-skeleton__stack">
                    {[0, 1, 2].map((i) => (
                        <div className="home-skeleton__block" key={i} />
                    ))}
                </div>
            </div>
            <div className="home-skeleton__row">
                {[0, 1, 2, 3].map((i) => (
                    <div className="home-skeleton__block" key={i} />
                ))}
            </div>
        </div>
    )
}

function ErrorState({ error, onRetry }) {
    return (
        <div className="home-error" role="alert">
            <p>{error.message || 'Đã có lỗi xảy ra.'}</p>
            <button type="button" onClick={onRetry}>Thử lại</button>
        </div>
    )
}

function Hero({ hero }) {
    const { main, side } = hero
    return (
        <section className="home-hero" aria-label="Tin nổi bật">
            <article className="home-hero__main">
                <Link to={articlePath(main)} className="home-hero__image">
                    <img src={main.image} alt={main.imageAlt} />
                </Link>
                <div className="home-hero__content">
                    <Link className="education-label" to={categoryPath(main.categorySlug)}>{main.category}</Link>
                    <h2><Link to={articlePath(main)}>{main.title}</Link></h2>
                    <p>{main.summary}</p>
                    <span className="education-meta">{main.date} · {main.readTime}</span>
                </div>
            </article>

            <div className="home-hero__side">
                {side.map((a) => (
                    <article className="home-hero__item" key={a.slug}>
                        <Link to={articlePath(a)} className="home-hero__thumb">
                            <img src={a.image} alt={a.imageAlt} loading="lazy" />
                        </Link>
                        <div>
                            <span className="education-label">{a.category}</span>
                            <h3><Link to={articlePath(a)}>{a.title}</Link></h3>
                            <span className="education-meta">{a.date}</span>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}

function Focus({ items }) {
    return (
        <section className="home-focus" aria-labelledby="focus-title">
            <div className="education-section-heading">
                <h2 id="focus-title">Tiêu điểm</h2>
            </div>
            <div className="home-focus__grid">
                {items.map((a) => (
                    <article className="home-focus__card" key={a.slug}>
                        <Link to={articlePath(a)} className="home-focus__image">
                            <img src={a.image} alt={a.imageAlt} loading="lazy" />
                        </Link>
                        <h3><Link to={articlePath(a)}>{a.title}</Link></h3>
                    </article>
                ))}
            </div>
        </section>
    )
}

function LatestList({ initial, excludeSlugs }) {
    const [items, setItems] = useState(initial.items)
    const [page, setPage] = useState(initial.page)
    const [hasMore, setHasMore] = useState(initial.hasMore)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const loadMore = async () => {
        setLoading(true)
        setError(null)
        try {
            const next = await api.getArticles({ page: page + 1, limit: 8, exclude: excludeSlugs })
            setItems((prev) => [...prev, ...next.items])
            setPage(next.page)
            setHasMore(next.hasMore)
        } catch (e) {
            setError(e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="education-latest" aria-labelledby="home-latest-title">
            <div className="education-section-heading">
                <h2 id="home-latest-title">Tin mới</h2>
            </div>
            <div className="article-list">
                {items.map((a) => (
                    <ArticleCard article={a} key={a.slug} />
                ))}
            </div>
            {error && <p className="home-error__inline" role="alert">{error.message}</p>}
            {hasMore && (
                <button type="button" className="home-more" onClick={loadMore} disabled={loading}>
                    {loading ? 'Đang tải…' : 'Xem thêm'}
                </button>
            )}
        </section>
    )
}

function MostRead({ items }) {
    return (
        <aside className="education-popular" aria-labelledby="home-popular-title">
            <div className="education-section-heading">
                <h2 id="home-popular-title">Đọc nhiều</h2>
            </div>
            <ol>
                {items.map((a) => (
                    <li key={a.slug}>
                        <Link to={articlePath(a)}>{a.title}</Link>
                    </li>
                ))}
            </ol>
        </aside>
    )
}

function CategorySection({ category, articles }) {
    const [lead, ...rest] = articles
    if (!lead) return null
    return (
        <section className="home-section" aria-labelledby={`sec-${category.slug}`}>
            <div className="education-section-heading">
                <h2 id={`sec-${category.slug}`}>{category.name}</h2>
                <Link className="home-section__more" to={categoryPath(category.slug)}>Xem thêm</Link>
            </div>
            <div className="home-section__grid">
                <article className="home-section__lead">
                    <Link to={articlePath(lead)} className="home-section__image">
                        <img src={lead.image} alt={lead.imageAlt} loading="lazy" />
                    </Link>
                    <span className="education-label">{lead.category}</span>
                    <h3><Link to={articlePath(lead)}>{lead.title}</Link></h3>
                    <p>{lead.summary}</p>
                </article>
                <ul className="home-section__list">
                    {rest.map((a) => (
                        <li key={a.slug}>
                            <span className="education-label">{a.category}</span>
                            <Link to={articlePath(a)}>{a.title}</Link>
                            <span className="education-meta">{a.date}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default function HomePage() {
    const { data, loading, error, refetch } = useApi(api.getHome)

    return (
        <div className="education-page home-page">
            <div className="education-page__container">
                {loading && <Skeleton />}
                {error && <ErrorState error={error} onRetry={refetch} />}
                {data && (
                    <>
                        <Hero hero={data.hero} />
                        <Focus items={data.focus} />
                        <div className="education-content-grid">
                            <LatestList initial={data.latest} excludeSlugs={data.usedSlugs} />
                            <MostRead items={data.mostRead} />
                        </div>
                        {data.sections.map((s,i) => (
                            <Fragment key={s.category.slug}>
                                <CategorySection category={s.category} articles={s.articles} />
                                {i === 1 && <AdSlot slot="leaderboard" index={1} />}
                            </Fragment>
                        ))}
                    </>
                )}
            </div>
        </div>
    )
}