import styles from './SearchBox.module.css';

interface SearchBoxProps {
    onSearch: (query: string) => void;
}

const SearchBox = ({ onSearch }: SearchBoxProps) => {
    return (
        <input
            className={styles.input}
            type="text"
            placeholder="Search notes"
            onChange={(e) => onSearch(e.target.value)}
        />
    );
};

export default SearchBox;