import { Link } from 'react-router-dom'
import Highlight from '../highlight/Highlight'

export default function ArticleCard({ article, highlight = '' }) {
    return (
        <article className="article-card">
            <Link className="article-card__image" to={`/bai-viet/${article.slug}`}>
                <img src={article.image} alt={article.imageAlt} loading="lazy" />
            </Link>
            <div className="article-card__content">
                <span className="education-label">{article.category}</span>
                <h3>
                    <Link to={`/bai-viet/${article.slug}`}>
                        <Highlight text={article.title} keyword={highlight} />
                    </Link>
                </h3>
                <p>
                    <Highlight text={article.summary} keyword={highlight} />
                </p>
                <time className="education-meta">{article.date}</time>
            </div>
        </article>
    )
}