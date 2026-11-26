import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api, useApi } from '../../api'
import NotFoundPage from '../notFoundPage/NotFoundPage'
import '../educationPage/EducationPage.css'
import '../HomePage/HomePage.css'
import './MagazinePage.css'

export default function MagazineDetailPage() {
    const { slug } = useParams()
    const { data: mag, loading, error, refetch } = useApi(api.getMagazineBySlug, slug)
    const { data: related } = useApi(api.getRelatedMagazines, slug)
    const [progress, setProgress] = useState(0)
    const [activeId, setActiveId] = useState(null)

    useEffect(() => {
        const onScroll = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight
            setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0)
        }
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        if (!mag) return undefined
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) setActiveId(e.target.id)
                })
            },
            { rootMargin: '-20% 0px -70% 0px' },
        )
        mag.sections.forEach((s) => {
            const el = document.getElementById(s.id)
            if (el) observer.observe(el)
        })
        return () => observer.disconnect()
    }, [mag])

    if (error?.status === 404) return <NotFoundPage />

    const jumpTo = (id) => {
        const el = document.getElementById(id)
        if (!el) return
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
        setActiveId(id)
    }

    if (loading) return <p className="mag-status" role="status" aria-busy="true">Đang tải…</p>

    if (error) {
        return (
            <div className="home-error mag-status" role="alert">
                <p>{error.message || 'Không tải được bài viết.'}</p>
                <button type="button" onClick={refetch}>Thử lại</button>
            </div>
        )
    }

    if (!mag) return null

    return (
        <article className="mag">
            <div className="mag-progress" style={{ width: `${progress}%` }} aria-hidden="true" />

            <header className="mag-hero">
                <img src={mag.cover} alt="" />
                <div className="mag-hero__shade" />
                <div className="mag-hero__text">
                    <Link to="/magazine" className="mag-hero__back">← Magazine</Link>
                    <span className="mag-hero__cat">{mag.category}</span>
                    <h1>{mag.title}</h1>
                    <p>{mag.deck}</p>
                    <span className="mag-hero__meta">
                        {mag.author} · {mag.date} · {mag.readTime} phút đọc
                    </span>
                </div>
            </header>
            <p className="mag-caption">{mag.coverCaption}</p>

            <div className="mag-body">
                <nav className="mag-toc" aria-label="Mục lục">
                    <h2>Mục lục</h2>
                    <ol>
                        {mag.sections.map((s) => (
                            <li key={s.id}>
                                <a
                                    href={`#${s.id}`}
                                    className={activeId === s.id ? 'is-active' : ''}
                                    aria-current={activeId === s.id ? 'true' : undefined}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        jumpTo(s.id)
                                    }}
                                >
                                    {s.heading}
                                </a>
                            </li>
                        ))}
                    </ol>
                </nav>

                <div className="mag-content">
                    {mag.sections.map((s) => (
                        <section key={s.id} id={s.id} className="mag-section">
                            <h2>{s.heading}</h2>
                            {s.paragraphs.map((p, i) => (
                                <p key={i}>{p}</p>
                            ))}
                            {s.quote && <blockquote className="mag-quote">{s.quote}</blockquote>}
                            {s.image && (
                                <figure className="mag-figure">
                                    <img src={s.image.src} alt="" loading="lazy" />
                                    <figcaption>{s.image.caption}</figcaption>
                                </figure>
                            )}
                        </section>
                    ))}

                    <ul className="mag-tags" aria-label="Thẻ">
                        {mag.tags.map((t) => (
                            <li key={t}>{t}</li>
                        ))}
                    </ul>
                </div>
            </div>

            {related && related.length > 0 && (
                <aside className="mag-next" aria-labelledby="mag-next-title">
                    <h2 id="mag-next-title">Đọc tiếp</h2>
                    <div className="mag-next__grid">
                        {related.map((m) => (
                            <Link key={m.slug} to={`/magazine/${m.slug}`} className="mag-next__item">
                                <img src={m.cover} alt="" loading="lazy" />
                                <span>{m.title}</span>
                            </Link>
                        ))}
                    </div>
                </aside>
            )}
        </article>
    )
}
