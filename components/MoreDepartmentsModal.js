import PropTypes from 'prop-types';
import Filter from './Filter';

const MoreDepartmentsModal = ({ departments, setFilter, activeFilter }) => {
  return (
    <div
      className="px-4 py-4 outline-none cursor-auto"
      tabIndex={0}
      role="button"
      onClick={(e) => {
        e.stopPropagation();
      }}
      onKeyDown={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="border-b border-gray-200 py-2 px-4  text-lg font-bold">
        department
      </div>
      <div className="flex px-4 py-2 flex-wrap space-y-4 justify-start items-baseline">
        {departments &&
          departments.map((department) => {
            return (
              <div className="flex flex-grow-0 flex-shrink-0 w-1/4 items-center pr-6">
                <span
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    setFilter(department.key);
                  }}
                  onKeyDown={() => {
                    setFilter(department.key);
                  }}
                  className={`self-start text-base font-normal capitalize outline-none ${
                    activeFilter === department.key ? 'text-blue-500' : ''
                  }`}
                >
                  {department.key}
                </span>
                <span className="justify-self-start mx-6 text-sm  font-light text-gray-600">
                  {department.doc_count}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

MoreDepartmentsModal.propTypes = {
  departments: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      doc_count: PropTypes.number.isRequired,
    })
  ).isRequired,
  setFilter: PropTypes.func.isRequired,
  activeFilter: PropTypes.string.isRequired,
};

export default MoreDepartmentsModal;
