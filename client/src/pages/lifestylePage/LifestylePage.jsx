import CategoryNewsPage from '../../components/categoryNews/CategoryNewsPage'
import { lifestyleArticles } from '../../data/lifestyleArticles'

const topics = [
    'Sống xanh',
    'Sức khỏe',
    'Gia đình',
    'Du lịch',
    'Nhà cửa',
    'Cộng đồng',
    'Tài chính cá nhân',
]

export default function LifestylePage() {
    return (
        <CategoryNewsPage
            name="Đời sống"
            eyebrow="Sống khỏe · Kết nối · Trải nghiệm"
            intro="Những câu chuyện, xu hướng và gợi ý hữu ích cho cuộc sống hằng ngày."
            topics={topics}
            articles={lifestyleArticles}
        />
    )
}
