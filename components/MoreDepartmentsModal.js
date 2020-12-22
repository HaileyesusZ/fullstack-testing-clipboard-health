import PropTypes from 'prop-types';

const MoreDepartmentsModal = ({ departments }) => {
  return (
    <div>
      <div className="border-b border-black py-2 px-4"> Department</div>
      <div className="flex px-4 py-2">
        {departments &&
          departments.map((department) => {
            return (
              <div>
                <span className="text-base font-normal capitalize">
                  {department.key}
                </span>
                <span className="mx-6 text-sm  font-light text-gray-600">
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
};

export default MoreDepartmentsModal;
