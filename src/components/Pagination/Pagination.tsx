import {FC} from 'react'
import { PaginationProps } from '../../types/pagination'
import styles from "../Pagination/Pagination.module.css"
import { useMemo } from 'react'
const Pagination : FC<PaginationProps> = ({currentPage, setCurrentPage, totalPages}) => {
  const switchPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const pages = useMemo<number[]>(() => Array.from({length: totalPages}, (_, k) => k + 1), [totalPages]);

  return (
    <div className={styles["pagination-container"]}>
      {pages.map((page) => (
        <button
          key={page}
          className={styles["pagination-btn"]}
          style={{
            backgroundColor: currentPage === page ? "red" : "gray",
          }}
          onClick={() => switchPage(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

export default Pagination