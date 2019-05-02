import React from 'react';

import Link from 'next/link';

const HeaderLayout = ({ children }) => {
  return (
    <>
      <header>
        <div className="l-nav l-nav--fixed m-tx-white">
          <nav className="nav nav--bar m-pd-xt-h">
            <span className="nav__logo m-fx-c-c">
              <Link href="/">
                <a>
                  <img className="brand-image" src="../../static/images/brand-logo.svg" />
                </a>
              </Link>
            </span>

            <ul className="nav__actions m-tx-up">
              <li className="nav__action">
                <Link href="/blog">
                  <a>blog</a>
                </Link>
              </li>
              <li className="nav__action">
                <Link href="/">
                  <a>linkedin</a>
                </Link>
              </li>
              <li className="nav__action">
                <Link href="/">
                  <a>github</a>
                </Link>
              </li>
              <li className="nav__action">
                <Link href="/">
                  <a>mail</a>
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
