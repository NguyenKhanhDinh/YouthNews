import { useState } from 'react'
import { api, useApi } from '../../api'
import './AdSlot.css'

export default function AdSlot({ slot = 'leaderboard', index = 0 }) {
    const [hidden, setHidden] = useState(false)
    const { data: ad, loading, error } = useApi(api.getAd, { slot, index })

    if (hidden || error) return null

    return (
        <aside className={`ad ad--${slot}`} aria-label="Quảng cáo">
            <span className="ad__label">Quảng cáo</span>
            <button type="button" className="ad__close" onClick={() => setHidden(true)} aria-label="Ẩn quảng cáo này">
                ×
            </button>
            {loading || !ad ? (
                <div className="ad__box ad__box--loading" aria-hidden="true" />
            ) : (
                <a
                    className={`ad__box ad__box--${ad.theme}`}
                    href={ad.url}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                >
                    <span className="ad__brand">{ad.brand}</span>
                    <span className="ad__text">
                        <strong>{ad.headline}</strong>
                        <span>{ad.body}</span>
                    </span>
                    <span className="ad__cta">{ad.cta}</span>
                </a>
            )}
        </aside>
    )
}
