import { Link } from 'react-router-dom'
import { formatDuration, formatViews } from './videoUtils'

export default function VideoCard({ video, featured = false }) {
    return (
        <article className={`video-card${featured ? ' video-card--featured' : ''}`}>
            <Link className="video-card__thumb" to={`/video/${video.slug}`} aria-label={`Xem video: ${video.title}`}>
                <img src={video.thumbnail} alt="" loading={featured ? 'eager' : 'lazy'} />
                <span className="video-card__play" aria-hidden="true" />
                <span className="video-card__duration">{formatDuration(video.duration)}</span>
            </Link>
            <div className="video-card__body">
                <span className="education-label">{video.categoryName}</span>
                <h3><Link to={`/video/${video.slug}`}>{video.title}</Link></h3>
                {featured && <p>{video.summary}</p>}
                <p className="video-card__meta">{video.date} · {formatViews(video.views)}</p>
            </div>
        </article>
    )
}
