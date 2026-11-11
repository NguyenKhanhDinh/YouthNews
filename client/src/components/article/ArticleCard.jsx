import { Link } from 'react-router-dom'

export default function ArticleCard({ article }) {
    return (
        <article className="article-card">
            <Link className="article-card__image" to="/chuyen-muc/giao-duc">
                <img src={article.image} alt={article.imageAlt} loading="lazy" />
            </Link>
            <div className="article-card__content">
                <span className="education-label">{article.category}</span>
                <h3>
                    <Link to="/chuyen-muc/giao-duc">{article.title}</Link>
                </h3>
                <p>{article.summary}</p>
                <time className="education-meta">{article.date}</time>
            </div>
        </article>
    )
}
