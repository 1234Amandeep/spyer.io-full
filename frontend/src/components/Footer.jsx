import React from "react";

export default function Footer() {
  return (
    <footer className="pb-3">
      <hr className="mt-0" />
      <nav className="navbar sticky-bottom flex-nowrap ">
        <div className="container">
          <a className="navbar-brand" href="#">
            Spyer.io
          </a>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-dark text-nowrap" type="button">
              Find me
            </button>
          </form>
        </div>
      </nav>
    </footer>
  );
}
