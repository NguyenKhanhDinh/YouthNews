import { Link, useSearchParams } from 'react-router-dom'
import { api, useApi } from '../../api'
import PodcastCard from './PodcastCard'
import '../educationPage/EducationPage.css'
import '../HomePage/HomePage.css'
import './PodcastPage.css'

export default function PodcastPage() {
    const [params, setParams] = useSearchParams()
    const show = params.get('chuong-trinh') || undefined
    const { data, loading, error, refetch } = useApi(api.getPodcasts, { show })

    const selectShow = (name) => setParams(name ? { 'chuong-trinh': name } : {})

    return (
        <div className="education-page">
            <div className="education-page__container">
                <div className="education-page__breadcrumb">
                    <Link to="/">Trang chủ</Link>
                    <span>/</span>
                    <span>Podcast</span>
                </div>

                <h1 className="podcast-page__title">Podcast</h1>

                {error && (
                    <div className="home-error" role="alert">
                        <p>{error.message || 'Không tải được danh sách podcast.'}</p>
                        <button type="button" onClick={refetch}>Thử lại</button>
                    </div>
                )}

                {loading && <p role="status" aria-busy="true">Đang tải podcast…</p>}

                {data && (
                    <>
                        <div className="podcast-page__filters" role="group" aria-label="Lọc theo chương trình">
                            <button type="button" aria-pressed={!show} onClick={() => selectShow()}>
                                Tất cả
                            </button>
                            {data.shows.map((name) => (
                                <button key={name} type="button" aria-pressed={show === name} onClick={() => selectShow(name)}>
                                    {name}
                                </button>
                            ))}
                        </div>

                        {data.items.length === 0 ? (
                            <p role="status">Chưa có tập nào trong chương trình này.</p>
                        ) : (
                            <>
                                <PodcastCard episode={data.items[0]} featured />
                                <div className="podcast-page__list">
                                    {data.items.slice(1).map((ep) => (
                                        <PodcastCard key={ep.slug} episode={ep} />
                                    ))}
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
