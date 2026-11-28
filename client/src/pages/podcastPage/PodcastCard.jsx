import { Link } from 'react-router-dom'
import { formatMinutes } from './podcastUtils'

export default function PodcastCard({ episode, featured = false }) {
    return (
        <article className={`podcast-card${featured ? ' podcast-card--featured' : ''}`}>
            <Link
                to={`/podcast/${episode.slug}`}
                className={`podcast-card__cover podcast-card__cover--${episode.theme}`}
                aria-label={`Nghe: ${episode.title}`}
            >
                <span className="podcast-card__show">{episode.show}</span>
                <span className="podcast-card__ep">Tập {episode.episode}</span>
            </Link>
            <div className="podcast-card__body">
                <span className="education-label">{episode.show} · Tập {episode.episode}</span>
                <h3><Link to={`/podcast/${episode.slug}`}>{episode.title}</Link></h3>
                <p>{episode.summary}</p>
                <p className="podcast-card__meta">{episode.date} · {formatMinutes(episode.duration)}</p>
            </div>
        </article>
    )
}