import logo from '../assets/super-logo.png'

function Navbar() {
    return (
        <div className="navbar"
            style={{
                width: '100%',
                height: '100px',
                position: 'fixed',
                top: 0,
                left: 0,
                backgroundColor: 'blue',
            }}
        >
            <div className="navbar-content"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%',
                    padding: '0 20px',
                }}
            >
                <div className="navbar-logo"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                    }}
                >
                    <img src={logo} alt="logo" style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
                </div>
                <div className="navbar-links"
                    style={{
                        marginLeft: 'auto',
                        display: 'flex',
                        gap: '20px',
                    }}
                >
                    <a href="#">Home</a>
                    <a href="#">About</a>
                    <a href="#">Contact</a>
                </div>
            </div>
        </div>
    )
}

export default Navbar;