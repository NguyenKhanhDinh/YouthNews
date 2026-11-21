import { Link, useParams } from 'react-router-dom'
import { api, useApi } from '../../api'
import NotFoundPage from '../notFoundPage/NotFoundPage'
import VideoCard from './VideoCard'
import { formatViews } from './videoUtils'
import '../educationPage/EducationPage.css'
import '../HomePage/HomePage.css'
import './VideoPage.css'

export default function VideoDetailPage() {
    const { slug } = useParams()
    const videoState = useApi(api.getVideoBySlug, slug)
    const relatedState = useApi(api.getRelatedVideos, slug)

    if (videoState.error?.status === 404) return <NotFoundPage />

    const video = videoState.data
    const related = relatedState.data ?? []

    return (
        <div className="education-page">
            <div className="education-page__container">
                <div className="education-page__breadcrumb">
                    <Link to="/">Trang chủ</Link>
                    <span>/</span>
                    <Link to="/video">Video</Link>
                    {video && (
                        <>
                            <span>/</span>
                            <span>{video.categoryName}</span>
                        </>
                    )}
                </div>

                {videoState.loading && <p role="status" aria-busy="true">Đang tải video…</p>}

                {videoState.error && (
                    <div className="home-error" role="alert">
                        <p>{videoState.error.message || 'Không tải được video.'}</p>
                        <button type="button" onClick={videoState.refetch}>Thử lại</button>
                    </div>
                )}

                {video && (
                    <div className="video-detail">
                        <div className="video-detail__main">
                            <div className="video-detail__player">
                                <iframe
                                    key={video.youtubeId}
                                    src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?rel=0`}
                                    title={video.title}
                                    allow="accelerometer; encrypted-media; picture-in-picture; fullscreen"
                                    allowFullScreen
                                />
                            </div>
                            <h1 className="video-detail__title">{video.title}</h1>
                            <p className="video-card__meta">{video.date} · {formatViews(video.views)}</p>
                            <p className="video-detail__summary">{video.summary}</p>
                            <ul className="video-detail__tags" aria-label="Thẻ">
                                {video.tags.map((t) => (
                                    <li key={t}>{t}</li>
                                ))}
                            </ul>
                            <a
                                className="video-detail__yt"
                                href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Xem trên YouTube
                            </a>
                        </div>

                        <aside className="video-detail__side" aria-labelledby="related-videos">
                            <h2 id="related-videos">Video khác</h2>
                            {related.map((v) => (
                                <VideoCard key={v.slug} video={v} />
                            ))}
                        </aside>
                    </div>
                )}
            </div>
        </div>
    )
}
