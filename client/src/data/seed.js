import { articles as baseArticles } from './articles'
import { categories } from './categories'

export function slugify(text) {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
}

function hash(text) {
    let h = 0
    for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) >>> 0
    return h
}

const pad = (n) => String(n).padStart(2, '0')
const formatDate = (d) => `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`

function parseDMY(text) {
    const [d, m, y] = text.split('/').map(Number)
    return new Date(y, m - 1, d, 8, 0, 0)
}

const HOUR = 3600 * 1000

const raw = [
    ['cong-nghe', 'Trí tuệ nhân tạo', 'Sinh viên ứng dụng AI vào học tập: dùng thế nào cho hiệu quả?', 'Các công cụ AI đang trở thành trợ lý học tập, nhưng cần dùng đúng cách để không bị phụ thuộc.'],
    ['cong-nghe', 'Khởi nghiệp', 'Nhóm sinh viên đưa ý tưởng ứng dụng quản lý thời gian ra thị trường', 'Từ một bài tập nhóm, dự án được hoàn thiện thành sản phẩm có người dùng thật.'],
    ['cong-nghe', 'Thủ thuật', '5 thiết lập giúp điện thoại bền pin hơn trong ngày dài', 'Một vài thay đổi nhỏ trong phần cài đặt có thể kéo dài đáng kể thời gian sử dụng.'],
    ['cong-nghe', 'Thiết bị', 'Chọn laptop cho sinh viên: ưu tiên cấu hình hay độ bền?', 'Gợi ý các tiêu chí cân nhắc theo ngành học và ngân sách của từng người.'],
    ['cong-nghe', 'An ninh mạng', 'Bảo vệ tài khoản cá nhân: những thói quen đơn giản nhưng quan trọng', 'Mật khẩu mạnh, xác thực hai lớp và cảnh giác với liên kết lạ là ba bước nền tảng.'],

    ['doi-song', 'Cộng đồng', 'Những chuyến xe sách mang tri thức đến vùng khó khăn', 'Các tình nguyện viên trẻ duy trì hoạt động quyên góp và luân chuyển sách đến nhiều điểm trường.'],
    ['doi-song', 'Gia đình', 'Cuối tuần của gia đình trẻ: cách dành thời gian chất lượng bên nhau', 'Vài hoạt động đơn giản giúp các thành viên trong nhà gắn kết hơn.'],
    ['doi-song', 'Ẩm thực', 'Bữa sáng nhanh gọn cho người bận rộn', 'Gợi ý thực đơn có thể chuẩn bị trong chưa đầy 15 phút.'],
    ['doi-song', 'Du lịch', 'Du lịch bụi cuối năm: lên kế hoạch gọn nhẹ mà vẫn thoải mái', 'Cách chia ngân sách, chọn lịch trình và chuẩn bị hành lý cho chuyến đi ngắn ngày.'],
    ['doi-song', 'Nhà ở', 'Sắp xếp góc học tập nhỏ gọn trong phòng trọ', 'Ánh sáng, bàn ghế và cách bố trí quyết định phần lớn hiệu quả làm việc.'],
    ['doi-song', 'Cộng đồng', 'Tổ chức hoạt động cộng đồng nhỏ: bắt đầu từ nhu cầu quanh mình', 'Một kế hoạch vừa sức và sự phối hợp rõ ràng giúp nhóm tình nguyện duy trì hoạt động lâu dài.', [
        'Một hoạt động cộng đồng thiết thực thường bắt đầu bằng việc lắng nghe người sẽ tham gia hoặc nhận hỗ trợ. Thay vì chọn một chương trình thật lớn, nhóm có thể xác định một nhu cầu cụ thể trong khu dân cư và hỏi xem mọi người đang cần điều gì.',
        'Sau khi thống nhất mục tiêu, hãy chia công việc thành những phần rõ ràng như liên hệ địa điểm, chuẩn bị vật dụng và thông báo thời gian. Một bảng phân công đơn giản giúp mỗi người biết mình phụ trách việc gì.',
        'Nhóm cũng nên dự trù chi phí và thống nhất cách tiếp nhận, sử dụng nguồn đóng góp. Thông tin minh bạch giúp các thành viên yên tâm và dễ phối hợp hơn.',
        'Kết thúc hoạt động, dành thời gian ghi nhận điều đã làm được và những điểm cần điều chỉnh. Việc giữ liên lạc với cộng đồng sẽ giúp lần tổ chức tiếp theo phù hợp hơn với nhu cầu thực tế.',
    ]],
    ['doi-song', 'Cộng đồng', 'Góc trao đổi đồ dùng giúp kéo dài vòng đời vật dụng', 'Một điểm chia sẻ trong khu phố có thể kết nối người còn cần đồ dùng với người muốn trao tặng.', [
        'Nhiều món đồ vẫn còn sử dụng tốt nhưng không còn phù hợp với chủ cũ. Một góc trao đổi nhỏ tại khu dân cư, trường học hoặc câu lạc bộ có thể giúp những vật dụng ấy tìm được người cần.',
        'Để việc chia sẻ thuận tiện, người tặng nên mô tả tình trạng món đồ và chỉ nhận trao đổi những vật dụng sạch, an toàn. Nhóm điều phối có thể thống nhất trước các loại đồ được nhận để tránh phát sinh khó khăn khi lưu trữ.',
        'Thông tin về thời gian, địa điểm và cách nhận đồ cần được đăng rõ ràng. Nếu số lượng nhiều, có thể hẹn khung giờ cụ thể để mọi người không phải chờ lâu.',
        'Mô hình này không thay thế hoạt động hỗ trợ chuyên nghiệp, nhưng tạo thêm cơ hội kết nối và sử dụng đồ dùng hợp lý hơn. Bắt đầu ở quy mô nhỏ giúp nhóm dễ theo dõi và điều chỉnh cách tổ chức.',
    ]],
    ['doi-song', 'Gia đình', 'Chia việc nhà hợp lý để mọi thành viên cùng chủ động', 'Thống nhất đầu việc theo thời gian và khả năng giúp việc nhà bớt dồn lên một người.', [
        'Việc nhà thường dễ trở thành áp lực nếu chỉ một thành viên ghi nhớ và thực hiện mọi thứ. Cả gia đình có thể cùng liệt kê những việc cần làm trong tuần, sau đó thống nhất cách chia phù hợp với lịch sinh hoạt của từng người.',
        'Danh sách nên cụ thể, chẳng hạn ai chuẩn bị bữa tối vào ngày nào hoặc thời điểm nào cả nhà cùng dọn dẹp. Trẻ nhỏ có thể tham gia những việc đơn giản, an toàn và phù hợp với độ tuổi.',
        'Lịch phân công không cần cứng nhắc. Khi có người bận hoặc phát sinh việc đột xuất, các thành viên có thể đổi phần việc cho nhau và cập nhật lại kế hoạch.',
        'Một cuộc trao đổi ngắn vào cuối tuần giúp gia đình xem cách sắp xếp hiện tại có thuận tiện không. Mục tiêu là cùng chia sẻ trách nhiệm, không phải chấm điểm hay tạo thêm áp lực.',
    ]],
    ['doi-song', 'Gia đình', 'Tạo khoảng thời gian không màn hình để cả nhà trò chuyện', 'Một thói quen nhỏ trong ngày giúp các thành viên có thêm cơ hội lắng nghe nhau.', [
        'Điện thoại và máy tính thường xuất hiện trong nhiều hoạt động thường ngày. Gia đình có thể thử chọn một khoảng thời gian ngắn, chẳng hạn trong bữa ăn, để mọi người tạm cất thiết bị và tập trung trò chuyện.',
        'Để thói quen mới dễ duy trì, các thành viên nên cùng thống nhất thời điểm và cùng làm gương. Có thể bắt đầu vài buổi mỗi tuần thay vì đặt ra quy tắc quá khó thực hiện.',
        'Một câu hỏi mở về điều thú vị trong ngày hoặc kế hoạch cuối tuần có thể giúp cuộc trò chuyện tự nhiên hơn. Người nghe nên tạo không gian để mỗi thành viên chia sẻ theo cách riêng.',
        'Nếu lịch sinh hoạt không trùng nhau, gia đình có thể chọn một hoạt động khác như đi bộ hoặc cùng chuẩn bị bữa ăn. Điều quan trọng là dành sự chú ý cho nhau trong khoảng thời gian đã chọn.',
    ]],
    ['doi-song', 'Ẩm thực', 'Chuẩn bị bữa trưa mang theo với thực đơn linh hoạt', 'Lên danh sách nguyên liệu và sơ chế trước giúp tiết kiệm thời gian vào những ngày bận rộn.', [
        'Bữa trưa mang theo sẽ dễ chuẩn bị hơn khi thực đơn được chọn dựa trên lịch trình và điều kiện bảo quản. Có thể bắt đầu bằng những món quen thuộc, sử dụng nguyên liệu dễ tìm và không đòi hỏi nhiều bước chế biến.',
        'Trước khi đi mua sắm, hãy kiểm tra thực phẩm sẵn có và ghi lại phần còn thiếu. Sơ chế một số nguyên liệu từ trước giúp rút ngắn thời gian nấu, nhưng cần bảo quản riêng và phù hợp với hướng dẫn an toàn thực phẩm.',
        'Hộp đựng nên sạch, kín và có kích thước vừa với khẩu phần dự định. Nếu nơi làm việc hoặc trường học không có điều kiện giữ lạnh, hãy chọn món phù hợp với thời gian di chuyển và nhiệt độ môi trường.',
        'Không cần chuẩn bị một thực đơn cố định cho cả tuần. Thay đổi món theo sở thích và nguyên liệu sẵn có giúp việc nấu ăn linh hoạt, tránh lãng phí thực phẩm.',
    ]],
    ['doi-song', 'Ẩm thực', 'Đọc nhãn thực phẩm khi lựa chọn món ăn đóng gói', 'Quan sát thành phần, hướng dẫn bảo quản và hạn sử dụng giúp người mua hiểu rõ sản phẩm hơn.', [
        'Khi chọn thực phẩm đóng gói, người mua có thể bắt đầu bằng việc xem tên sản phẩm, danh sách thành phần và thông tin dị ứng được công bố trên bao bì. Những mục này giúp nhận biết sản phẩm có phù hợp với nhu cầu cá nhân hay không.',
        'Bảng thông tin dinh dưỡng nên được đọc theo khẩu phần ghi trên nhãn. Hai sản phẩm chỉ có thể so sánh hợp lý khi quy đổi về cùng lượng dùng, thay vì nhìn riêng một con số nổi bật.',
        'Hãy kiểm tra hạn sử dụng, tình trạng bao bì và hướng dẫn bảo quản trước khi mua. Sau khi mở gói, cần làm theo chỉ dẫn của nhà sản xuất và không dùng sản phẩm có dấu hiệu bất thường.',
        'Nhãn thực phẩm cung cấp thông tin để tham khảo, không thay thế tư vấn chuyên môn cho người có nhu cầu dinh dưỡng đặc biệt. Khi cần thiết, hãy trao đổi với chuyên gia y tế hoặc dinh dưỡng.',
    ]],
    ['doi-song', 'Du lịch', 'Lên lịch trình cuối tuần vừa đủ để chuyến đi không quá vội', 'Chọn ít điểm đến và chừa thời gian nghỉ giúp lịch trình linh hoạt hơn.', [
        'Một chuyến đi ngắn sẽ thoải mái hơn khi lịch trình ưu tiên những trải nghiệm thật sự muốn thử. Thay vì xếp quá nhiều điểm trong một ngày, hãy chọn một khu vực chính và kiểm tra thời gian di chuyển giữa các địa điểm.',
        'Trước khi khởi hành, nên xác nhận giờ mở cửa, phương tiện và nơi lưu trú từ kênh chính thức. Dự trù một khoản cho các chi phí phát sinh giúp kế hoạch không bị phụ thuộc vào một mức chi cố định.',
        'Hành lý gọn nhẹ giúp việc di chuyển dễ dàng hơn. Danh sách đồ cần mang nên dựa trên thời tiết, thời lượng chuyến đi và hoạt động dự định, tránh mang theo những món ít có khả năng sử dụng.',
        'Hãy để một khoảng trống trong lịch trình để nghỉ ngơi hoặc thay đổi kế hoạch khi cần. Tôn trọng quy định tại điểm đến và giữ gìn không gian chung cũng góp phần tạo trải nghiệm tốt cho mọi người.',
    ]],
    ['doi-song', 'Du lịch', 'Chọn phương tiện phù hợp cho chuyến đi ngắn', 'So sánh thời gian, chi phí và điểm đón trả giúp lựa chọn cách di chuyển sát nhu cầu.', [
        'Với chuyến đi ngắn, phương tiện phù hợp phụ thuộc vào quãng đường, số người và lượng hành lý. Người đi có thể so sánh thời gian tổng thể, bao gồm cả quãng đường đến bến hoặc điểm đón.',
        'Thông tin về giờ chạy, giá vé và điều kiện đổi trả nên được kiểm tra trên website hoặc ứng dụng chính thức của đơn vị vận chuyển. Đặt chỗ sớm không đồng nghĩa mọi phương án đều linh hoạt, vì vậy hãy đọc kỹ điều kiện trước khi thanh toán.',
        'Nếu tự lái xe, cần tính cả thời gian nghỉ và tìm hiểu quy định giao thông tại nơi đến. Với phương tiện công cộng, hãy chuẩn bị phương án kết nối cho chặng cuối để tránh bị động.',
        'Khi đã chọn phương tiện, lưu lại xác nhận đặt chỗ và địa chỉ cần thiết ở nơi dễ truy cập. Một kế hoạch dự phòng đơn giản sẽ hữu ích nếu lịch trình thay đổi.',
    ]],
    ['doi-song', 'Nhà ở', 'Giữ phòng trọ gọn gàng với lịch dọn dẹp ngắn mỗi ngày', 'Chia việc thành những khoảng nhỏ giúp căn phòng dễ duy trì ngăn nắp hơn.', [
        'Một căn phòng nhỏ thường nhanh bừa bộn khi đồ dùng không có vị trí cố định. Hãy bắt đầu bằng cách chọn chỗ để cho những vật thường dùng như chìa khóa, giấy tờ và đồ học tập.',
        'Thay vì chờ đến cuối tuần mới dọn toàn bộ, có thể dành vài phút mỗi ngày để trả đồ về chỗ cũ, gom rác và lau khu vực vừa sử dụng. Việc chia nhỏ giúp lịch dọn dẹp ít gây áp lực hơn.',
        'Đồ ít dùng nên được phân loại trước khi mua thêm hộp hoặc kệ lưu trữ. Tận dụng không gian theo chiều đứng có thể hữu ích, nhưng cần đặt vật nặng chắc chắn và không cản lối đi.',
        'Mỗi phòng có diện tích và cách sinh hoạt khác nhau, vì vậy hãy thử một cách sắp xếp trong vài ngày rồi điều chỉnh. Mục tiêu là thuận tiện cho người ở, không phải tạo ra một căn phòng chỉ để trưng bày.',
    ]],
    ['doi-song', 'Nhà ở', 'Chọn đèn bàn phù hợp cho góc học tập nhỏ', 'Vị trí đặt đèn, độ ổn định và cách sử dụng đều ảnh hưởng đến sự thoải mái khi học.', [
        'Khi bố trí đèn bàn, hãy quan sát hướng viết và vị trí ngồi để hạn chế bóng đổ lên khu vực làm việc. Đèn cần đặt chắc chắn, không chiếm quá nhiều diện tích và có thể điều chỉnh hướng chiếu khi cần.',
        'Người mua nên xem thông tin về độ sáng, màu ánh sáng và hướng dẫn sử dụng của sản phẩm. Nếu có thể, hãy thử đèn trong không gian thực tế để biết ánh sáng có phù hợp với mắt và mặt bàn hay không.',
        'Kết hợp đèn bàn với ánh sáng chung trong phòng thường giúp không gian cân bằng hơn thay vì chỉ dùng một nguồn sáng mạnh. Màn hình cũng nên được đặt để giảm phản chiếu trực tiếp.',
        'Thói quen nghỉ mắt và điều chỉnh tư thế vẫn quan trọng khi học lâu. Đèn phù hợp hỗ trợ góc học tập, nhưng không thay thế việc bố trí bàn ghế và thời gian nghỉ hợp lý.',
    ]],

    ['the-thao', 'Bóng đá', 'Giải bóng đá sinh viên khởi tranh với nhiều đội bóng mới', 'Các trường đại học bước vào mùa giải với đội hình được làm mới.'],
    ['the-thao', 'Thể thao sinh viên', 'Hội thao sinh viên: nơi những tài năng trẻ tỏa sáng', 'Hàng trăm vận động viên cùng tranh tài ở nhiều bộ môn.'],
    ['the-thao', 'Điền kinh', 'Chạy bộ buổi sáng: bắt đầu thế nào để không chấn thương?', 'Khởi động kỹ, tăng dần cự ly và chọn giày phù hợp là những điểm cần lưu ý.'],
    ['the-thao', 'Cờ vua', 'Phong trào cờ vua học đường ngày càng lan rộng', 'Câu lạc bộ cờ vua giúp học sinh rèn tư duy và sự kiên nhẫn.'],
    ['the-thao', 'Thể hình', 'Lịch tập 3 buổi mỗi tuần dành cho người mới bắt đầu', 'Cách xây dựng thói quen tập luyện bền vững mà không quá sức.'],

    ['thoi-su', 'Chính sách', 'Những điểm mới trong chính sách hỗ trợ học sinh, sinh viên cần biết', 'Tổng hợp các thông tin chính để người học chủ động tìm hiểu.'],
    ['thoi-su', 'Đô thị', 'Không gian xanh trong đô thị: bài toán của quy hoạch và thói quen cộng đồng', 'Cây xanh và công viên góp phần cải thiện chất lượng sống cho cư dân.'],
    ['thoi-su', 'Giao thông', 'Giờ cao điểm: giải pháp giảm ùn tắc từ những thay đổi nhỏ', 'Điều chỉnh giờ làm, giờ học và thói quen di chuyển có thể giảm áp lực cho hạ tầng.'],
    ['thoi-su', 'Môi trường', 'Phân loại rác tại nguồn: bắt đầu từ mỗi gia đình', 'Những bước đầu tiên đơn giản nhưng cần sự kiên trì của cả cộng đồng.'],
    ['thoi-su', 'Pháp luật', 'Hiểu đúng về quyền và nghĩa vụ khi ký hợp đồng thuê nhà', 'Các điều khoản về đặt cọc, thời hạn và sửa chữa cần được đọc kỹ trước khi ký.'],

    ['the-gioi', 'Châu Á', 'Xu hướng giáo dục số lan rộng tại nhiều quốc gia châu Á', 'Học trực tuyến và học liệu số ngày càng được tích hợp vào chương trình giảng dạy.'],
    ['the-gioi', 'Châu Âu', 'Nhiều thành phố châu Âu thúc đẩy giao thông xanh', 'Làn đường xe đạp và phương tiện công cộng được ưu tiên trong quy hoạch mới.'],
    ['the-gioi', 'Khoa học', 'Những phát hiện khoa học đáng chú ý trong tuần', 'Điểm lại một số nghiên cứu mới gây chú ý trong cộng đồng học thuật.'],
    ['the-gioi', 'Văn hóa', 'Lễ hội mùa đông thu hút du khách quốc tế', 'Các hoạt động âm nhạc, ẩm thực và nghệ thuật đường phố tạo nên không khí sôi động.'],
    ['the-gioi', 'Kinh tế thế giới', 'Thị trường lao động toàn cầu thay đổi ra sao trước làn sóng tự động hóa?', 'Nhiều ngành nghề đòi hỏi kỹ năng mới và khả năng thích ứng nhanh hơn.'],

    ['kinh-te', 'Tài chính', 'Quản lý chi tiêu cá nhân: quy tắc 50/30/20 có phù hợp với người trẻ?', 'Cách chia thu nhập thành nhu cầu, mong muốn và tiết kiệm, cùng những điều chỉnh cần thiết.'],
    ['kinh-te', 'Khởi nghiệp', 'Startup trẻ gọi vốn: những câu hỏi nhà đầu tư thường đặt ra', 'Hiểu thị trường, mô hình doanh thu và đội ngũ là các chủ đề được hỏi nhiều nhất.'],
    ['kinh-te', 'Thị trường', 'Thị trường cuối năm: người tiêu dùng thận trọng hơn khi mua sắm', 'Nhiều người cân nhắc kỹ hơn giữa nhu cầu thực tế và các chương trình giảm giá.'],
    ['kinh-te', 'Việc làm', 'Kỹ năng nào giúp sinh viên mới ra trường nổi bật khi xin việc?', 'Giao tiếp, tự học và làm việc nhóm vẫn là những yêu cầu được nhà tuyển dụng nhắc đến nhiều.'],
    ['kinh-te', 'Tiêu dùng', 'Mua sắm trực tuyến thông minh: so sánh giá và đọc kỹ chính sách đổi trả', 'Một vài bước kiểm tra nhanh giúp hạn chế rủi ro khi đặt hàng online.'],

    ['suc-khoe', 'Dinh dưỡng', 'Ăn uống cân bằng trong mùa thi: nên và không nên', 'Bữa ăn đủ nhóm chất giúp duy trì sự tập trung và năng lượng.'],
    ['suc-khoe', 'Tâm lý', 'Giảm áp lực học tập: những cách đơn giản có thể thử mỗi ngày', 'Chia nhỏ mục tiêu, nghỉ ngơi hợp lý và chia sẻ với người thân là những gợi ý hữu ích.'],
    ['suc-khoe', 'Vận động', '10 phút vận động mỗi giờ cho người ngồi nhiều', 'Những động tác nhẹ nhàng giúp giảm mỏi vai gáy và tăng sự tỉnh táo.'],
    ['suc-khoe', 'Giấc ngủ', 'Ngủ đủ giấc giúp ghi nhớ tốt hơn như thế nào?', 'Giấc ngủ đều đặn là nền tảng của khả năng học tập và làm việc hiệu quả.'],
    ['suc-khoe', 'Phòng bệnh', 'Chuyển mùa: chăm sóc sức khỏe để hạn chế cảm cúm', 'Giữ ấm, ăn uống đủ chất và vệ sinh cá nhân là những thói quen cơ bản.'],
]

const bodyByCategory = {
    'cong-nghe': [
        'Công nghệ thay đổi rất nhanh, vì vậy điều quan trọng không phải là chạy theo mọi xu hướng mà là hiểu rõ nhu cầu của mình để chọn công cụ phù hợp.',
        'Người dùng nên tìm hiểu kỹ cách một ứng dụng hoặc thiết bị xử lý dữ liệu cá nhân, đồng thời cập nhật phần mềm thường xuyên để hạn chế rủi ro.',
        'Với người trẻ, việc kết hợp học lý thuyết và thực hành trên dự án nhỏ là cách tiến bộ nhanh và bền vững hơn so với chỉ đọc tài liệu.',
        'Bạn có thể bắt đầu từ một thay đổi nhỏ trong tuần này, sau đó đánh giá kết quả và điều chỉnh dần cho phù hợp với thói quen của mình.',
    ],
    'doi-song': [
        'Cuộc sống hằng ngày có nhiều điều nhỏ nhưng tạo nên khác biệt lớn khi được duy trì đều đặn và có kế hoạch rõ ràng.',
        'Nhiều người trẻ chọn cách bắt đầu từ những việc vừa sức như sắp xếp lại thời gian biểu, dành thời gian cho gia đình hoặc tham gia hoạt động cộng đồng.',
        'Điều quan trọng là tìm được nhịp sống phù hợp với hoàn cảnh riêng thay vì so sánh với người khác.',
        'Chia sẻ kinh nghiệm với bạn bè và người thân cũng là cách để cùng nhau tìm ra những giải pháp thiết thực.',
    ],
    'the-thao': [
        'Thể thao không chỉ là thi đấu mà còn là cách rèn luyện sức khỏe, tinh thần đồng đội và sự kiên trì.',
        'Người mới bắt đầu nên đặt mục tiêu vừa phải, khởi động kỹ và lắng nghe cơ thể để tránh chấn thương không đáng có.',
        'Các câu lạc bộ và giải phong trào là môi trường tốt để làm quen với bạn mới và duy trì động lực luyện tập.',
        'Một lịch tập đều đặn, kết hợp nghỉ ngơi và ăn uống hợp lý, sẽ mang lại kết quả rõ rệt sau một thời gian.',
    ],
    'thoi-su': [
        'Các vấn đề xã hội thường liên quan đến nhiều nhóm đối tượng, vì vậy việc tìm hiểu thông tin từ nguồn chính thống là bước đầu tiên cần thiết.',
        'Người dân và cộng đồng có thể đóng góp bằng những hành động cụ thể trong phạm vi của mình, từ tuân thủ quy định đến chia sẻ thông tin đúng cách.',
        'Các cơ quan chức năng cũng khuyến khích người dân phản ánh ý kiến qua các kênh tiếp nhận chính thức để vấn đề được xử lý kịp thời.',
        'Theo dõi thường xuyên các cập nhật mới sẽ giúp bạn nắm bắt đầy đủ và chính xác hơn.',
    ],
    'the-gioi': [
        'Nhìn ra thế giới giúp chúng ta có thêm góc nhìn để so sánh và rút ra những bài học phù hợp với hoàn cảnh của mình.',
        'Mỗi quốc gia có điều kiện và ưu tiên khác nhau, nên cùng một xu hướng có thể được triển khai theo những cách rất khác nhau.',
        'Các chuyên gia nhận định rằng sự hợp tác và trao đổi thông tin sẽ tiếp tục đóng vai trò quan trọng trong thời gian tới.',
        'Độc giả có thể tham khảo thêm các nguồn tin đa dạng để có cái nhìn toàn diện hơn về vấn đề.',
    ],
    'kinh-te': [
        'Hiểu những khái niệm tài chính cơ bản giúp người trẻ chủ động hơn trong việc quản lý thu nhập và đưa ra quyết định chi tiêu.',
        'Trước khi đưa ra bất kỳ quyết định tài chính nào, bạn nên tìm hiểu kỹ thông tin và cân nhắc khả năng chịu rủi ro của bản thân.',
        'Việc xây dựng quỹ dự phòng và thói quen tiết kiệm đều đặn thường được các chuyên gia khuyến nghị như bước nền tảng.',
        'Lưu ý rằng nội dung bài viết mang tính tham khảo chung, không phải lời khuyên đầu tư hay tài chính cá nhân.',
    ],
    'suc-khoe': [
        'Sức khỏe là kết quả của nhiều thói quen nhỏ được duy trì mỗi ngày, từ ăn uống, vận động đến giấc ngủ và tinh thần.',
        'Bạn nên bắt đầu từ những thay đổi dễ thực hiện, theo dõi cảm nhận của cơ thể và điều chỉnh dần cho phù hợp.',
        'Mỗi người có tình trạng sức khỏe khác nhau, vì vậy khi có triệu chứng bất thường hãy tham khảo ý kiến bác sĩ hoặc chuyên gia y tế.',
        'Nội dung bài viết chỉ mang tính thông tin chung và không thay thế tư vấn chuyên môn.',
    ],
}

const AUTHORS = {
    'giao-duc': 'Ban Giáo dục',
    'cong-nghe': 'Ban Công nghệ',
    'doi-song': 'Ban Đời sống',
    'the-thao': 'Ban Thể thao',
    'thoi-su': 'Ban Thời sự',
    'the-gioi': 'Ban Thế giới',
    'kinh-te': 'Ban Kinh tế',
    'suc-khoe': 'Ban Sức khỏe',
}

const NOW = new Date(2026, 10, 19, 9, 0, 0)

const extra = raw.map(([categorySlug, category, title, summary, content], i) => {
    const slug = slugify(title).slice(0, 80)
    // Rải bài theo thời gian, xen kẽ chuyên mục để hero có nhiều chuyên mục
    const publishedAt = new Date(NOW.getTime() - ((i % 7) * 9 + Math.floor(i / 7) * 2) * HOUR)
    return {
        slug,
        category,
        categorySlug,
        title,
        summary,
        image: `https://picsum.photos/seed/${slug}/1200/800`,
        imageAlt: title,
        author: AUTHORS[categorySlug],
        readTime: `${3 + (hash(slug) % 5)} phút đọc`,
        content: content ?? [summary, ...bodyByCategory[categorySlug]],
        publishedAt: publishedAt.toISOString(),
        date: formatDate(publishedAt),
    }
})

const base = baseArticles.map((a, i) => {
    const publishedAt = new Date(parseDMY(a.date).getTime() + (baseArticles.length - i) * HOUR)
    return { ...a, publishedAt: publishedAt.toISOString() }
})

export const allArticles = [...base, ...extra]
    .map((a, i) => ({
        id: i + 1,
        views: 1000 + (hash(a.slug) % 9000),
        tags: [a.category, categories.find((c) => c.slug === a.categorySlug)?.name].filter(Boolean),
        ...a,
    }))
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
