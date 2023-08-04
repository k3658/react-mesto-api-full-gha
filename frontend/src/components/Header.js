import logo from "../images/logo.svg";
import { Route, Routes, Link } from "react-router-dom";
import React, { useRef, useEffect } from "react";

function Header({ userEmail, onLogout }) {
  const navMobile = useRef();
  const btnBurger = useRef();

  function handleToggleMenu() {
    navMobile.current.classList.toggle("active");
    btnBurger.current.classList.toggle("checked");
  }

  useEffect(() => {
  navMobile.current.classList.remove("active");
  }, [onLogout]);

  return (
    <>
      <nav className="header__nav_mobile" ref={navMobile}>
        <ul className="header__nav_menu">
          <li>
            <p className="header__nav_email">{userEmail}</p>
          </li>
          <li>
            <Link
              to="/sign-in"
              className="header__nav_logout"
              onClick={onLogout}
            >
              Выйти
            </Link>
          </li>
        </ul>
      </nav>

      <div className="header">
        <img className="header__logo" src={logo} alt="Логотип" />

        <Routes>
          <Route
            path="/"
            element={
            <>
              <nav className="header__nav_desktop">
                <p className="header__email">{userEmail}</p>
                <Link 
                  to="/sign-in" 
                  className="header__link" 
                  onClick={onLogout}
                >
                  Выйти
                </Link>
              </nav>
              <label className="header__nav_button">
                <input
                  className="header__nav_switcher"
                  ref={btnBurger}
                  type="checkbox"
                  onClick={handleToggleMenu}
                />
                <span className="header__nav_button_transition" />
                <span className="header__nav_button_transition" />
                <span className="header__nav_button_transition" />
                <span className="header__nav_button_transition" />
              </label>
            </>
            }
          />

          <Route
            path="/sign-in"
            element={
              <Link to="/sign-up" className="header__link">
                Регистрация
              </Link>
            }
            />

          <Route
            path="/sign-up"
            element={
              <Link to="/sign-in" className="header__link">
                Войти
              </Link>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default Header;
