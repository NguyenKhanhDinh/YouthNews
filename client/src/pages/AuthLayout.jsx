import { NavLink, Outlet } from 'react-router-dom'
import './Auth.css'
export default function AuthLayout() {
    return (
        <div className="auth">
            <div className="auth__inner">
                <nav className="auth__tabs" aria-label="Đăng nhập hoặc đăng ký">
                    <NavLink to="/dang-nhap">Đăng nhập</NavLink>
                    <NavLink to="/dang-ky">Đăng ký</NavLink>
                </nav>
                <Outlet />
            </div>
        </div>
    )
}
