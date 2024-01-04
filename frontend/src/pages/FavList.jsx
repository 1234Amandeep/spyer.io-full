import React, { useContext } from "react";
import favListContext from "../context/favListContext";
import ListItem from "../components/ListItem";

export default function FavList() {
  const { favList, setFavList } = useContext(favListContext);

  if (!favList || favList.length == 0) {
    return (
      <>
        <article
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
        >
          <div className="offcanvas-header">
            <h5
              className="offcanvas-title text-center font-monospace text-decoration-underline"
              id="offcanvasExampleLabel"
            >
              Wishlist
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <p className="text-center mt-5 h6">empty list.</p>
          </div>
        </article>
      </>
    );
  }
  // <article className="favList container mt-5">
  //   <h1 className="text-center font-monospace text-decoration-underline">
  //     Your Wishlist
  //   </h1>
  //   <div className="wishlist">
  //     <p className="text-center mt-5 h6">empty list.</p>
  //   </div>
  // </article>

  return (
    <>
      <article
        className="offcanvas offcanvas-end offcanvas-container"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5
            className="offcanvas-title text-center font-monospace text-decoration-underline"
            id="offcanvasExampleLabel"
          >
            Wishlist
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="mt-5 wishlist d-flex justify-content-center align-items-center">
            <ol className="list-group list-group-numbered ">
              {favList.map((item, index) => (
                <ListItem key={index} item={item} />
              ))}
            </ol>
          </div>
        </div>
      </article>
    </>
  );
}
