import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import Filter from './Filter';

const SideBar = ({
  filters,
  showModal = false,
  handleShowMore,
  setFilter,
  activeFilter,
}) => {
  return (
    <div className="md:flex md:flex-col hidden">
      {filters &&
        Object.keys(filters).map((filter) => {
          return (
            <Filter
              key={uuid()}
              categoryName={filter}
              filters={filters[filter]}
              showModal={showModal}
              handleShowMore={handleShowMore}
              setFilter={setFilter}
              activeFilter={activeFilter}
            />
          );
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
  showModal: PropTypes.bool.isRequired,
  handleShowMore: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  activeFilter: PropTypes.string.isRequired,
};
export default SideBar;
