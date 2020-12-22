import PropTypes from 'prop-types';
import Filter from './Filter';

const SideBar = ({ filters }) => {
  return (
    <div className="flex flex-col">
      {filters &&
        Object.keys(filters).map((filter) => {
          return <Filter categoryName={filter} filters={filters[filter]} />;
        })}
    </div>
  );
};

SideBar.propTypes = {
  filters: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        doc_count: PropTypes.number.isRequired,
      })
    )
  ).isRequired,
};
export default SideBar;
