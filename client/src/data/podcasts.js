const SAMPLE = (n) => `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${n}.mp3`

export const podcasts = [
    {
        id: 'p1', slug: 'chuyen-sinh-vien-tap-12-lac-nhip-nam-dau', show: 'Chuyện sinh viên', theme: 'blue', episode: 12,
        title: 'Tân sinh viên và nỗi sợ “lạc nhịp” ở năm đầu',
        summary: 'Vì sao nhiều bạn thấy chới với trong học kỳ đầu, và những thói quen nhỏ giúp bắt kịp nhịp học đại học.',
        categorySlug: 'giao-duc', duration: 1260, publishedAt: '2026-11-24T08:00:00',
        audioUrl: SAMPLE(1), tags: ['Sinh viên', 'Năm nhất'],
    },
    {
        id: 'p2', slug: 'ban-tin-5-phut-diem-tin-24-11', show: 'Bản tin 5 phút', theme: 'green', episode: 48,
        title: 'Bản tin 5 phút: điểm tin ngày 24/11',
        summary: 'Những tin đáng chú ý trong ngày về giáo dục, đời sống và công nghệ, gói gọn trong năm phút.',
        categorySlug: 'thoi-su', duration: 310, publishedAt: '2026-11-24T06:30:00',
        audioUrl: SAMPLE(2), tags: ['Điểm tin', 'Thời sự'],
    },
    {
        id: 'p3', slug: 'khoi-nghiep-tre-tap-7-san-pham-dau-tien', show: 'Khởi nghiệp trẻ', theme: 'dark', episode: 7,
        title: 'Từ ý tưởng đến sản phẩm đầu tiên trong 30 ngày',
        summary: 'Một nhóm sinh viên kể cách chốt phạm vi, chia việc và ra mắt bản thử nghiệm chỉ trong một tháng.',
        categorySlug: 'kinh-te', duration: 1740, publishedAt: '2026-11-22T19:00:00',
        audioUrl: SAMPLE(3), tags: ['Khởi nghiệp', 'Sản phẩm'],
    },
    {
        id: 'p4', slug: 'chuyen-sinh-vien-tap-11-hoc-nhom-hay-mot-minh', show: 'Chuyện sinh viên', theme: 'blue', episode: 11,
        title: 'Học nhóm hay học một mình: cách nào hiệu quả hơn?',
        summary: 'So sánh hai cách học theo từng loại môn và gợi ý cách kết hợp để không bị phân tâm.',
        categorySlug: 'giao-duc', duration: 1180, publishedAt: '2026-11-20T08:00:00',
        audioUrl: SAMPLE(4), tags: ['Học tập', 'Học nhóm'],
    },
    {
        id: 'p5', slug: 'ban-tin-5-phut-tuan-le-khoa-hoc-cong-nghe', show: 'Bản tin 5 phút', theme: 'green', episode: 47,
        title: 'Bản tin 5 phút: tuần lễ khoa học và công nghệ',
        summary: 'Điểm lại các phát minh và sự kiện công nghệ nổi bật của tuần dành cho người trẻ.',
        categorySlug: 'cong-nghe', duration: 295, publishedAt: '2026-11-19T06:30:00',
        audioUrl: SAMPLE(5), tags: ['Công nghệ', 'Điểm tin'],
    },
    {
        id: 'p6', slug: 'chuyen-sinh-vien-tap-10-thuc-tap-som', show: 'Chuyện sinh viên', theme: 'blue', episode: 10,
        title: 'Thực tập sớm: có nên bỏ lỡ kỳ nghỉ hè?',
        summary: 'Ba sinh viên chia sẻ điều họ được và mất khi đi thực tập từ năm hai.',
        categorySlug: 'giao-duc', duration: 1320, publishedAt: '2026-11-16T08:00:00',
        audioUrl: SAMPLE(6), tags: ['Thực tập', 'Hướng nghiệp'],
    },
    {
        id: 'p7', slug: 'khoi-nghiep-tre-tap-6-goi-von-lan-dau', show: 'Khởi nghiệp trẻ', theme: 'dark', episode: 6,
        title: 'Gọi vốn lần đầu: những câu hỏi nhà đầu tư hay hỏi',
        summary: 'Chuẩn bị gì trước buổi thuyết trình đầu tiên và cách trả lời khi chưa có doanh thu.',
        categorySlug: 'kinh-te', duration: 1620, publishedAt: '2026-11-12T19:00:00',
        audioUrl: SAMPLE(7), tags: ['Khởi nghiệp', 'Gọi vốn'],
    },
    {
        id: 'p8', slug: 'chuyen-sinh-vien-tap-9-quan-ly-tien-xa-nha', show: 'Chuyện sinh viên', theme: 'blue', episode: 9,
        title: 'Quản lý tiền khi sống xa nhà',
        summary: 'Cách lập ngân sách tháng đơn giản và những khoản chi hay bị bỏ sót của sinh viên ở trọ.',
        categorySlug: 'doi-song', duration: 1090, publishedAt: '2026-11-09T08:00:00',
        audioUrl: SAMPLE(8), tags: ['Tài chính', 'Đời sống'],
    },
]
