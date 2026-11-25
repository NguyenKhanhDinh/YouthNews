import { useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api, useApi } from '../../api'
import NotFoundPage from '../notFoundPage/NotFoundPage'
import PodcastCard from './PodcastCard'
import { formatMinutes } from './podcastUtils'
import '../educationPage/EducationPage.css'
import '../HomePage/HomePage.css'
import './PodcastPage.css'

const RATES = [1, 1.25, 1.5, 2]

function Player({ src, title }) {
    const audioRef = useRef(null)
    const [rate, setRate] = useState(1)
    const [failed, setFailed] = useState(false)

    const changeRate = (r) => {
        setRate(r)
        if (audioRef.current) audioRef.current.playbackRate = r
    }
    const skip = (seconds) => {
        const a = audioRef.current
        if (a) a.currentTime = Math.max(0, a.currentTime + seconds)
    }

    return (
        <div className="podcast-player">
            <audio
                ref={audioRef}
                src={src}
                controls
                preload="metadata"
                aria-label={`Trình phát: ${title}`}
                onError={() => setFailed(true)}
            />
            {failed && (
                <p className="podcast-player__error" role="alert">
                    Không phát được tệp âm thanh này. Hãy kiểm tra đường dẫn <code>audioUrl</code> trong dữ liệu.
                </p>
            )}
            <div className="podcast-player__controls">
                <button type="button" onClick={() => skip(-15)}>↺ Lùi 15 giây</button>
                <button type="button" onClick={() => skip(15)}>Tiến 15 giây ↻</button>
                <div className="podcast-player__rates" role="group" aria-label="Tốc độ phát">
                    {RATES.map((r) => (
                        <button key={r} type="button" aria-pressed={rate === r} onClick={() => changeRate(r)}>
                            {r}×
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default function PodcastDetailPage() {
    const { slug } = useParams()
    const epState = useApi(api.getPodcastBySlug, slug)
    const relatedState = useApi(api.getRelatedPodcasts, slug)

    if (epState.error?.status === 404) return <NotFoundPage />

    const ep = epState.data
    const related = relatedState.data ?? []

    return (
        <div className="education-page">
            <div className="education-page__container">
                <div className="education-page__breadcrumb">
                    <Link to="/">Trang chủ</Link>
                    <span>/</span>
                    <Link to="/podcast">Podcast</Link>
                    {ep && (
                        <>
                            <span>/</span>
                            <span>{ep.show}</span>
                        </>
                    )}
                </div>

                {epState.loading && <p role="status" aria-busy="true">Đang tải podcast…</p>}

                {epState.error && (
                    <div className="home-error" role="alert">
                        <p>{epState.error.message || 'Không tải được tập podcast.'}</p>
                        <button type="button" onClick={epState.refetch}>Thử lại</button>
                    </div>
                )}

                {ep && (
                    <div className="podcast-detail">
                        <div className="podcast-detail__main">
                            <span className="education-label">{ep.show} · Tập {ep.episode}</span>
                            <h1 className="podcast-detail__title">{ep.title}</h1>
                            <p className="podcast-card__meta">
                                {ep.date} · {formatMinutes(ep.duration)} · {ep.categoryName}
                            </p>
                            <Player key={ep.slug} src={ep.audioUrl} title={ep.title} />
                            <p className="podcast-detail__summary">{ep.summary}</p>
                            <ul className="podcast-detail__tags" aria-label="Thẻ">
                                {ep.tags.map((t) => (
                                    <li key={t}>{t}</li>
                                ))}
                            </ul>
                        </div>

                        <aside className="podcast-detail__side" aria-labelledby="related-podcasts">
                            <h2 id="related-podcasts">Tập khác</h2>
                            {related.map((r) => (
                                <PodcastCard key={r.slug} episode={r} />
                            ))}
                        </aside>
                    </div>
                )}
            </div>
        </div>
    )
}
