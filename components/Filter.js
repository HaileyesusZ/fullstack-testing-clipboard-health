import PropTypes from 'prop-types';
import uuid from 'react-uuid';

const Filter = ({
  categoryName,
  filters,
  handleShowMore,
  setFilter,
  activeFilter,
}) => (
  <div className="flex flex-col mt-4 bg-white pl-6 py-2">
    <h5 className="text-normal font-bold uppercase">{categoryName}</h5>

    <div className="mt-2">
      {filters &&
        filters.map((filter, index) => {
          if (index <= 9) {
            return (
              <div key={uuid()} className="mt-2">
                <span
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    setFilter(filter.key);
                  }}
                  onKeyDown={() => {
                    setFilter(filter.key);
                  }}
                  className={`outline-none text-base font-normal capitalize ${
                    activeFilter === filter.key ? 'text-blue-500' : ''
                  }`}
                >
                  {filter.key}
                </span>
                <span className="mx-6 text-sm  font-light text-gray-600">
                  {filter.doc_count}
                </span>
              </div>
            );
          }
          if (index === 10) {
            return (
              <div key={uuid()} className="mt-2">
                <span
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    e.stopPropagation();
                    handleShowMore(true);
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShowMore(true);
                  }}
                  className="text-sm text-blue-500"
                >
                  Show More
                </span>
              </div>
            );
          }
          return null;
        })}
    </div>
  </div>
);

Filter.propTypes = {
  categoryName: PropTypes.string.isRequired,
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      doc_count: PropTypes.number.isRequired,
    })
  ).isRequired,
  handleShowMore: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  activeFilter: PropTypes.string.isRequired,
};

export default Filter;
