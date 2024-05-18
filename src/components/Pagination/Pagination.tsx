import {FC} from 'react'
import { PaginationProps } from '../../types/pagination'

const Pagination : FC<PaginationProps> = ({currentPage, setCurrentPage, totalPages}) => {
  const switchPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div>
      {pages.map((page) => (
        <button
          key={page}
          style={{
            backgroundColor: currentPage === page ? "red" : "gray",
            color: "white",
            padding: "10px",
            margin: "5px",
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