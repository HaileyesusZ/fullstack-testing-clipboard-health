import PropTypes from 'prop-types';

const Filter = ({ categoryName, filters }) => (
  <div className="flex flex-col mt-4 bg-white py-4 pl-6 py-2">
    <h5 className="text-normal font-bold uppercase">{categoryName}</h5>

    <div className="mt-2">
      {filters &&
        filters.map((filter) => {
          return (
            <div className="mt-2">
              <span className="text-base font-normal capitalize">
                {filter.key}
              </span>
              <span className="mx-6 text-sm  font-light text-gray-600">
                {filter.doc_count}
              </span>
            </div>
          );
        })}
    </div>
  </div>
);

Filter.propTypes = {
  categoryName: PropTypes.string.isRequired,
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Filter;
