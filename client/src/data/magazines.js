const img = (seed, w = 1600, h = 900) => `https://picsum.photos/seed/${seed}/${w}/${h}`

export const magazines = [
    {
        id: 'm1', slug: 'mot-hoc-ky-o-ky-tuc-xa', categorySlug: 'giao-duc', category: 'Đời sống sinh viên',
        title: 'Một học kỳ ở ký túc xá',
        deck: 'Những điều không có trong sổ tay sinh viên: giờ giấc, bữa cơm chung và những cuộc thương lượng nhỏ giữa tám người xa lạ.',
        author: 'Nhóm Magazine YouthNews', publishedAt: '2026-11-23T08:00:00',
        cover: img('ky-tuc-xa-cover'), coverCaption: 'Dãy phòng ký túc xá lúc sáu giờ sáng, khi đèn hành lang còn sáng.',
        tags: ['Sinh viên', 'Ký túc xá', 'Longform'],
        sections: [
            {
                id: 'dem-dau-tien', heading: 'Đêm đầu tiên',
                paragraphs: [
                    'Minh kéo vali lên tầng ba lúc trời đã tối. Căn phòng có bốn chiếc giường tầng, tám chiếc tủ sắt và một chiếc quạt trần quay chậm. Không ai nói nhiều, chỉ có tiếng dây kéo balo và vài câu chào ngượng nghịu.',
                    'Đến gần nửa đêm, cậu vẫn chưa ngủ. Từ giường bên cạnh, ai đó khẽ hỏi: “Cậu cũng nhớ nhà à?”. Câu hỏi ấy hóa ra là cách nhanh nhất để cả phòng bắt đầu nói chuyện.',
                ],
            },
            {
                id: 'quy-tac-khong-ghi-tren-giay', heading: 'Quy tắc không ghi trên giấy',
                paragraphs: [
                    'Nội quy dán ở cửa chỉ có mười dòng. Còn lại là những thỏa thuận mà mỗi phòng tự đặt ra: ai được mở đèn đến mấy giờ, ai đổ rác, ai phải xin lỗi trước sau một cuộc cãi vã.',
                    'Lan, sinh viên năm hai ở dãy bên cạnh, gọi đó là “luật bất thành văn”. Theo chị, phòng nào sớm nói thẳng với nhau về giờ ngủ thì cả học kỳ ít mâu thuẫn hơn hẳn.',
                ],
                quote: 'Sống chung không khó vì khác nhau, mà khó vì không ai chịu nói ra điều mình cần.',
            },
            {
                id: 'bua-com-chung', heading: 'Bữa cơm chung',
                paragraphs: [
                    'Cuối tuần, căn bếp tập thể ở tầng trệt đông nhất. Người nấu mì, người rán trứng, người mang nồi cơm điện từ quê lên. Mùi hành phi lan khắp hành lang.',
                    'Những bữa ăn ấy hiếm khi đủ chất, nhưng đủ ấm. Có bạn nói chính ở đó mình học cách nấu ăn, cách chia tiền chợ và cả cách lắng nghe người khác kể chuyện nhà.',
                ],
                image: { src: img('bua-com-chung'), caption: 'Căn bếp tập thể vào chiều chủ nhật.' },
            },
            {
                id: 'tien-gio-giac-thuong-luong', heading: 'Tiền, giờ giấc và những cuộc thương lượng',
                paragraphs: [
                    'Chi phí ký túc xá rẻ hơn nhà trọ, nhưng không phải ai cũng thấy nhẹ nhõm. Có người đi làm thêm ca tối, về lúc mười một giờ khi cả phòng đã tắt đèn.',
                    'Phòng của Minh thống nhất một quy ước: ai về muộn thì dùng đèn bàn nhỏ, ai ngủ sớm thì đeo bịt tai. Không bên nào hoàn toàn hài lòng, nhưng cả hai đều chấp nhận được.',
                ],
            },
            {
                id: 'dieu-o-lai', heading: 'Điều ở lại',
                paragraphs: [
                    'Đến tuần thi cuối kỳ, những chiếc giường tầng gần như thành bàn học. Người này mượn vở của người kia, người kia pha cà phê cho cả phòng.',
                    'Ngày thu dọn, Minh nhận ra thứ cậu mang về không phải là điểm số mà là bảy người bạn và một thói quen: hỏi han nhau trước khi tắt đèn.',
                ],
            },
        ],
    },
    {
        id: 'm2', slug: 'hanh-trinh-san-hoc-bong-lan-thu-hai', categorySlug: 'giao-duc', category: 'Hướng nghiệp',
        title: 'Lần thứ hai nộp hồ sơ học bổng',
        deck: 'Ba sinh viên từng bị từ chối kể lại cách họ viết lại câu chuyện của mình, và vì sao con số điểm không nói hết mọi thứ.',
        author: 'Nhóm Magazine YouthNews', publishedAt: '2026-11-20T09:30:00',
        cover: img('san-hoc-bong-cover'), coverCaption: 'Bàn học với chồng hồ sơ và bản nháp thư động lực.',
        tags: ['Học bổng', 'Hướng nghiệp', 'Longform'],
        sections: [
            {
                id: 'ho-so-dau-tien-bi-tu-choi', heading: 'Hồ sơ đầu tiên bị từ chối',
                paragraphs: [
                    'Thư báo kết quả đến vào một buổi sáng thứ Ba, chỉ gồm ba dòng ngắn. An đọc đi đọc lại, như thể câu chữ sẽ thay đổi nếu nhìn lâu hơn.',
                    'Cô đã chuẩn bị gần ba tháng: dịch bảng điểm, xin thư giới thiệu, viết đi viết lại bài luận. Cảm giác hụt hẫng không đến từ việc trượt, mà từ việc không biết mình đã sai ở đâu.',
                ],
            },
            {
                id: 'ba-nguoi-ba-cach-viet', heading: 'Ba người, ba cách viết',
                paragraphs: [
                    'An chọn kể về một dự án dạy tiếng Anh cho trẻ em ở quê. Bình viết về lần thất bại khi tổ chức câu lạc bộ khoa học. Chi chỉ đơn giản mô tả một ngày làm thêm ở quán cơm của gia đình.',
                    'Điểm chung của cả ba bài luận ở lần nộp thứ hai là có chi tiết cụ thể: một con số, một cái tên, một khoảnh khắc. Hội đồng chấm hàng trăm hồ sơ mỗi mùa, và chi tiết là thứ họ nhớ.',
                ],
                quote: 'Đừng viết điều bạn nghĩ hội đồng muốn nghe. Hãy viết điều chỉ bạn mới kể được.',
            },
            {
                id: 'mua-phong-van', heading: 'Mùa phỏng vấn',
                paragraphs: [
                    'Vòng phỏng vấn kéo dài hai mươi phút nhưng chuẩn bị mất hai tuần. Bình luyện nói trước gương, ghi âm rồi nghe lại, và nhờ bạn đóng vai người hỏi khó tính.',
                    'Cậu nói điều làm mình tiến bộ nhất không phải là học thuộc câu trả lời, mà là tập dừng lại một nhịp trước khi nói để sắp xếp ý.',
                ],
                image: { src: img('mua-phong-van'), caption: 'Buổi luyện phỏng vấn nhóm trong thư viện trường.' },
            },
            {
                id: 'con-so-khong-noi-het', heading: 'Con số không nói hết',
                paragraphs: [
                    'Điểm trung bình thường là thứ đầu tiên người ta nhìn vào, nhưng hiếm khi là thứ cuối cùng quyết định. Nhiều quỹ học bổng nói rõ họ tìm người có động lực và khả năng đóng góp cho cộng đồng.',
                    'Điều đó không có nghĩa điểm số không quan trọng. Nó chỉ nhắc rằng hồ sơ là một câu chuyện, và điểm số mới chỉ là một chương.',
                ],
            },
            {
                id: 'lan-thu-hai', heading: 'Lần thứ hai',
                paragraphs: [
                    'Mùa sau, An nộp lại cùng một chương trình. Cô không đổi mục tiêu, chỉ đổi cách kể. Kết quả vẫn chưa được công bố khi bài viết này lên trang.',
                    'Nhưng khi được hỏi sau này cô nghĩ gì, An nói bản hồ sơ năm nay là lần đầu cô thấy mình viết về chính mình, chứ không phải về một ứng viên lý tưởng.',
                ],
            },
        ],
    },
]
