import CategoryNewsPage from '../../components/categoryNews/CategoryNewsPage'
import { technologyArticles } from '../../data/technologyArticles'

const topics = [
    'AI',
    'Điện thoại',
    'Máy tính',
    'An ninh mạng',
    'Khoa học',
    'Khởi nghiệp',
]

export default function TechnologyPage() {
    return (
        <CategoryNewsPage
            name="Công nghệ"
            eyebrow="Sáng tạo · Kết nối · Tương lai"
            intro="Cập nhật xu hướng công nghệ, sản phẩm số, khoa học và những đổi mới đang thay đổi cuộc sống."
            topics={topics}
            articles={technologyArticles}
        />
    )
}
