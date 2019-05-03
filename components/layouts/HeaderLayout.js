import React from 'react';

import Link from 'next/link';

const HeaderLayout = ({ children }) => {
  return (
    <>
      <header>
        <div className="l-nav l-nav--fixed m-tx-white">
          <nav className="nav nav--bar m-pd-lg-h">
            <span className="nav__logo m-fx-st-c">
              <Link href="/">
                <a>
                  <img className="brand-image" src="../../static/images/brand-logo.svg" />
                </a>
              </Link>
            </span>

            <ul className="nav__actions m-tx-up">
              <li className="nav__action m-mg-xt-r">
                <Link href="/blog">
                  <a>
                    <img src="../../static/images/linkedin-icon.svg" alt="Linkedin icon" className="social-icon" />
                  </a>
                </Link>
              </li>
              <li className="nav__action m-mg-xt-r">
                <Link href="/">
                  <a>
                    <img src="../../static/images/github-icon.svg" alt="Github icon" className="social-icon" />
                  </a>
                </Link>
              </li>
              <li className="nav__action">
                <Link href="/">
                  <a>
                    <img src="../../static/images/mail-icon.svg" alt="EMail icon" className="social-icon" />
                  </a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <style jsx>{``}</style>
    </>
  );
};

export default HeaderLayout;
