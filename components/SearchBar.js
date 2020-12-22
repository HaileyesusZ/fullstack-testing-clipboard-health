import PropTypes from 'prop-types';

const SearchBar = ({ setKeyword }) => {
  return (
    <div className="flex justify-start items-center py-4 px-12 space-x-4 bg-white">
      <img className="w-4 h-4" src="/search.svg" alt="search" />
      <form>
        <input
          className="w-full py-1 rounded-sm focus:outline-none  "
          name="keyword"
          type="text"
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
          placeholder="Search for any job, title, keywords or company"
        />
      </form>
    </div>
  );
};

SearchBar.propTypes = {
  setKeyword: PropTypes.func.isRequired,
};

export default SearchBar;
