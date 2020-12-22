import PropTypes from 'prop-types';

const SearchResultHeader = ({ totalResults = 0, sortBy = {}, setSortBy }) => {
  const availableSorts = [
    'Location',
    'Role',
    'Department',
    'Education',
    'Experience',
  ];
  return (
    <div className="flex justify-between mt-2">
      <div> {totalResults} job postings</div>
      <div className="flex">
        <ul className="flex space-x-4">
          <li>
            <span className="font-light text-gray-700">Sort by</span>
          </li>

          {availableSorts.map((availableSort) => {
            const sortName = availableSort.toLowerCase();
            return (
              <li className="flex items-center cursor-pointer ">
                <span>{availableSort}</span>

                <svg
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    setSortBy(sortName, 'asc');
                  }}
                  onKeyDown={() => {
                    setSortBy(sortName, 'asc');
                  }}
                  className={`w-4 h-4 outline-none ${
                    sortBy[sortName] === 'asc' ? 'text-blue-400' : ''
                  } fill-current`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 42.67 64"
                >
                  <g data-name="Layer 2">
                    <path
                      d="M19.57.78L.78 19.5a2.67 2.67 0 003.77 3.78L18.67 9.21v52.12a2.67 2.67 0 105.33 0V9l14.11 14.27a2.67 2.67 0 103.78-3.76L23.35.79a2.67 2.67 0 00-3.78 0z"
                      data-name="Layer 1"
                    />
                  </g>
                </svg>

                <svg
                  className={`w-4 h-4 outline-none ${
                    sortBy[sortName] === 'desc' ? 'text-blue-400' : ''
                  } fill-current`}
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    setSortBy(sortName, 'desc');
                  }}
                  onKeyDown={() => {
                    setSortBy(sortName, 'desc');
                  }}
                  viewBox="0 0 42.67 64"
                >
                  <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_1-2" data-name="Layer 1">
                      <path
                        className="cls-1"
                        d="M23.1,63.22,41.88,44.5a2.67,2.67,0,1,0-3.76-3.78L24,54.79V2.67a2.67,2.67,0,1,0-5.33,0V55L4.56,40.73a2.67,2.67,0,0,0-3.77,0A2.63,2.63,0,0,0,0,42.61a2.68,2.68,0,0,0,.77,1.88L19.32,63.21a2.67,2.67,0,0,0,3.78,0Z"
                      />
                    </g>
                  </g>
                </svg>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

SearchResultHeader.propTypes = {
  totalResults: PropTypes.number.isRequired,
  sortBy: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  setSortBy: PropTypes.func.isRequired,
};
export default SearchResultHeader;
