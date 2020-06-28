import React, { useMemo } from 'react'

const Header = (props) =>
  useMemo(() => {
    const { navItems, onClick, active } = props
    return (
      <header className="App-header">
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="container">
            <a className="navbar-brand" href="/">
              Hot Cities
            </a>
            <div className="" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                {navItems &&
                  navItems.map((item) => {
                    return (
                      <li
                        className={`nav-item ${
                          active === item.name ? 'active' : ''
                        }`}
                        key={item.name}
                        onClick={() => onClick(item.name)}
                      >
                        <span className="nav-link">{item.text}</span>
                      </li>
                    )
                  })}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    )
  }, [props])
export default Header
