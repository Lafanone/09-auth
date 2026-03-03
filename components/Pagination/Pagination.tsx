import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.css';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ totalPages, currentPage, onPageChange }: PaginationProps) => {
  const handlePageClick = ({ selected }: { selected: number }) => {
    onPageChange(selected + 1);
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      pageCount={totalPages}
      forcePage={currentPage - 1}
      renderOnZeroPageCount={null}

      containerClassName={styles.pagination}  
      pageClassName={styles.item}                
      pageLinkClassName={styles.link}            
      activeClassName={styles.active}            
      previousClassName={styles.prevItem}        
      nextClassName={styles.nextItem}            
      previousLinkClassName={styles.prevLink}    
      nextLinkClassName={styles.nextLink}        
      disabledClassName={styles.disabled}        
    />
  );
};

export default Pagination;