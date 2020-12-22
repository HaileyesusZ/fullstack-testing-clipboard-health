import PropTypes from 'prop-types';
import MoreDepartmentsModal from './MoreDepartmentsModal';
import NavBar from './NavBar';
import SearchBar from './SearchBar';
import SideBar from './SideBar';

const Layout = ({
  children,
  filters,
  showModal,
  handleShowMore,
  setFilter,
  setKeyword,
  activeFilter,
}) => {
  return (
    <div
      className="relative outline-none cursor-auto"
      tabIndex={0}
      role="button"
      onKeyDown={() => handleShowMore(false)}
      onClick={() => handleShowMore(false)}
    >
      <NavBar />
      <div className="px-12 min-h-screen mt-4">
        <SearchBar setKeyword={setKeyword} />
        <div className="flex">
          <div className="flex-none">
            <SideBar
              filters={filters}
              showModal={showModal}
              handleShowMore={handleShowMore}
              setFilter={setFilter}
              activeFilter={activeFilter}
            />
          </div>

          <div className="flex-grow">{children}</div>
        </div>
      </div>
      {showModal && (
        <>
          <div className="absolute top-0  right-0 left-0 bottom-0 bg-black opacity-20 h-full" />
          <div className="absolute top-1/3 bg-white left-72 right-72 text-balck ">
            <MoreDepartmentsModal
              departments={filters.department}
              setFilter={setFilter}
              activeFilter={activeFilter}
            />
          </div>
        </>
      )}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  showModal: PropTypes.bool.isRequired,
  filters: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        doc_count: PropTypes.number.isRequired,
      })
    )
  ).isRequired,
  handleShowMore: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  setKeyword: PropTypes.func.isRequired,
  activeFilter: PropTypes.string.isRequired,
};

export default Layout;
