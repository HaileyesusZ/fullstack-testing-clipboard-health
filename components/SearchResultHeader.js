import PropTypes from 'prop-types';

const SearchResultHeader = ({ totalResults = 0 }) => {
  return (
    <div className="flex justify-between">
      <div> {totalResults} job postings</div>
      <div className="flex">
        <ul className="flex space-x-4">
          <li>
            <span className="font-light text-gray-700">Sort by</span>
          </li>
          <li className="cursor-pointer hover:text-blue-500">Location</li>
          <li className="cursor-pointer hover:text-blue-500">Role</li>
          <li className="cursor-pointer hover:text-blue-500">Department</li>
          <li className="cursor-pointer hover:text-blue-500">Education</li>
          <li className="cursor-pointer hover:text-blue-500">Experience</li>
        </ul>
      </div>
    </div>
  );
};

SearchResultHeader.propTypes = {
  totalResults: PropTypes.number.isRequired,
};
export default SearchResultHeader;
