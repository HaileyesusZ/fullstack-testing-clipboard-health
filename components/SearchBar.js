const SearchBar = () => {
  return (
    <div className="flex justify-center items-center py-4 px-12 space-x-4 bg-white">
      <img className="w-4 h-4" src="/search.svg" alt="search" />
      <input
        className="w-full py-1 rounded-sm focus:outline-none  "
        name="keyword"
        type="text"
        placeholder="Search for any job, title, keywords or company"
      />
    </div>
  );
};

export default SearchBar;
