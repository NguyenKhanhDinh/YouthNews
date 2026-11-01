import './Header.css'

const categories = ['Trang chủ', 'Giáo dục', 'Công nghệ', 'Đời sống', 'Thể thao']

export default function Header() {
  return (
    <header className="header">
      <div className="header__top">
        <a href="/" className="header__logo">YouthNews</a>
        <div className="header__search">
          <input type="text" placeholder="Tìm kiếm bài viết..." />
          <button>Tìm</button>
        </div>
      </div>

      <nav className="header__nav">
        <ul>
          {categories.map((name) => (
            <li key={name}>
              <a href="#">{name}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}