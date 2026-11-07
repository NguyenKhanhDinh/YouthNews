export default function Logo() {
    return (
        <>
            <svg className="logo__mark" viewBox="5 8 48 50" aria-hidden="true">
                <polygon className="m-arm" points="7,10 18,10 27,27 21,35" />
                <rect className="m-stem" x="21" y="10" width="10" height="46" />
                <polygon className="m-diag" points="21,10 31,10 51,56 41,56" />
                <rect className="m-red" x="41" y="10" width="10" height="46" />
            </svg>
            <span className="logo__text">
                <span className="logo">YOUTH NEWS</span>
                <small className="logo__tagline">Tin tức của tuổi trẻ</small>
            </span>
        </>
    )
}