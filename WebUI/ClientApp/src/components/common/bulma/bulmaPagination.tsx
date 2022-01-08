import * as React from "react";
import { ProductPaginationState } from "src/components/productAdmin/types";
import classNames from "classnames";

export interface IBulmaPaginationProps {
  handleNextPage: () => any;
  handlePrevPage: () => any;
  handleChangePage: (page: number) => any;
  pagination: ProductPaginationState;
}

const BulmaPagination = ({
  handleNextPage,
  handlePrevPage,
  handleChangePage,
  pagination,
}: IBulmaPaginationProps) => {
  const getPaginatedArray = () => {
    const tmpArr: Array<number> = [];

    for (let i = 1; i <= pagination.totalPages; i++) {
      tmpArr.push(i);
    }

    return tmpArr;
  };

  return (
    <>
      {pagination.totalPages !== 0 && (
        <div className="row">
          <nav
            className="pagination is-centered"
            role="navigation"
            aria-label="pagination"
          >
            <button
              className="pagination-previous"
              disabled={!pagination.hasPreviousPage}
              onClick={handlePrevPage}
            >
              Previous
            </button>
            <button
              className="pagination-next"
              disabled={!pagination.hasNextPage}
              onClick={handleNextPage}
            >
              Next page
            </button>
            <ul className="pagination-list">
              {getPaginatedArray().map((x, id) => {
                return (
                  <li key={id}>
                    <button
                      className={classNames("pagination-link", {
                        whiteColor: x === pagination.currentPage,
                        orangeBackColor: x === pagination.currentPage,
                      })}
                      onClick={() => handleChangePage(x)}
                    >
                      {x}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default BulmaPagination;
