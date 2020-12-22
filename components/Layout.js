import PropTypes from 'prop-types';
import NavBar from './NavBar';
import SearchBar from './SearchBar';
import SideBar from './SideBar';

const Layout = ({ children, filters }) => {
  return (
    <div>
      <NavBar />
      <div className="px-12 min-h-screen mt-4">
        <SearchBar />
        <div className="flex">
          <div className="flex-none">
            <SideBar filters={filters} />
          </div>

          <div className="flex-grow">{children}</div>
        </div>
      </div>
      <div className="absolute -top-1/3" />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Layout;
