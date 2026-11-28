import { Link } from 'react-router-dom'
import '../educationPage/EducationPage.css'
import './InfoPage.css'

export default function InfoPage({ page }) {
    return (
        <div className="education-page">
            <div className="education-page__container">
                <div className="education-page__breadcrumb">
                    <Link to="/">Trang chủ</Link>
                    <span>/</span>
                    <span>{page.title}</span>
                </div>

                <article className="info-page">
                    <p className="education-page__eyebrow">{page.eyebrow}</p>
                    <h1>{page.title}</h1>
                    <p className="info-page__intro">{page.intro}</p>

                    {page.sections.map((s) => (
                        <section key={s.heading} className="info-page__section">
                            <h2>{s.heading}</h2>
                            {s.paragraphs.map((p) => (
                                <p key={p}>{p}</p>
                            ))}
                            {s.items && (
                                <ul>
                                    {s.items.map((i) => (
                                        <li key={i}>{i}</li>
                                    ))}
                                </ul>
                            )}
                        </section>
                    ))}
                </article>
            </div>
        </div>
    )
}
