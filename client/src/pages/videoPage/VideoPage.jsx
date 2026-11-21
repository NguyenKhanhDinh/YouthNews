import { Link, useSearchParams } from 'react-router-dom'
import { api, useApi } from '../../api'
import VideoCard from './VideoCard'
import '../educationPage/EducationPage.css'
import '../HomePage/HomePage.css'
import './VideoPage.css'

export default function VideoPage() {
    const [params, setParams] = useSearchParams()
    const category = params.get('chuyen-muc') || undefined
    const { data, loading, error, refetch } = useApi(api.getVideos, { category })

    const selectCategory = (slug) => setParams(slug ? { 'chuyen-muc': slug } : {})

    return (
        <div className="education-page">
            <div className="education-page__container">
                <div className="education-page__breadcrumb">
                    <Link to="/">Trang chủ</Link>
                    <span>/</span>
                    <span>Video</span>
                </div>

                <h1 className="video-page__title">Video</h1>

                {error && (
                    <div className="home-error" role="alert">
                        <p>{error.message || 'Không tải được danh sách video.'}</p>
                        <button type="button" onClick={refetch}>Thử lại</button>
                    </div>
                )}

                {loading && <p role="status" aria-busy="true">Đang tải video…</p>}

                {data && (
                    <>
                        <div className="video-page__filters" role="group" aria-label="Lọc theo chuyên mục">
                            <button type="button" aria-pressed={!category} onClick={() => selectCategory()}>
                                Tất cả
                            </button>
                            {data.categories.map((c) => (
                                <button
                                    key={c.slug}
                                    type="button"
                                    aria-pressed={category === c.slug}
                                    onClick={() => selectCategory(c.slug)}
                                >
                                    {c.name}
                                </button>
                            ))}
                        </div>

                        {data.items.length === 0 ? (
                            <p role="status">Chưa có video trong chuyên mục này.</p>
                        ) : (
                            <>
                                <VideoCard video={data.items[0]} featured />
                                {data.items.length > 1 && (
                                    <div className="video-page__grid">
                                        {data.items.slice(1).map((v) => (
                                            <VideoCard key={v.slug} video={v} />
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
