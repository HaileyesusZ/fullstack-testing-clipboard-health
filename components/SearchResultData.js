import PropTypes from 'prop-types';
import { useState } from 'react';
import formatDate from '../utils/date';

const SearchResultData = ({ results = [] }) => {
  const [activeJobListing, setActiveJobListing] = useState(-1);
  const [activeJobItem, setActiveJobItem] = useState(-1);

  const handleActiveJobListing = (index) => {
    if (index === activeJobListing) {
      setActiveJobListing(-1);
    } else {
      setActiveJobListing(index);
    }
  };
  const handleActiveJobItem = (e, index) => {
    e.stopPropagation();
    if (index === activeJobItem) {
      setActiveJobItem(-1);
    } else {
      setActiveJobItem(index);
    }
  };
  return (
    <div className="">
      {results &&
        results.map((result, index) => {
          return (
            <div
              className=" py-4 cursor-pointer focus:outline-none"
              role="button"
              tabIndex={0}
              onKeyDown={() => handleActiveJobListing(index)}
              onClick={() => handleActiveJobListing(index)}
            >
              <div className="flex items-center space-x-4">
                <div className="flex justify-center items-center w-8 h-8 bg-gray-400 uppercase rounded text-white">
                  {result.name.substr(0, 2)}
                </div>
                <div>
                  {result.total_jobs_in_hospital} jobs for {result.name}
                </div>
              </div>
              {activeJobListing === index &&
                result.items &&
                result.items.map((item, itemIndex) => {
                  return (
                    <div
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => handleActiveJobItem(e, itemIndex)}
                      className="flex flex-col border-b py-4 outline-none"
                      onClick={(e) => handleActiveJobItem(e, itemIndex)}
                    >
                      <div className="flex justify-between items-center ">
                        <div className="flex flex-col">
                          <h3>{item.type}</h3>
                          <span>
                            {item.job_type} | {item.salary_range[0]} -{' '}
                            {item.salary_range[1]} per hour | {item.address}
                          </span>
                        </div>
                        <div> {formatDate(item.created)} </div>
                      </div>
                      {itemIndex === activeJobItem && (
                        <div>
                          <div className="flex mt-4">
                            <span className="flex-1 font-bold">
                              {' '}
                              Departments
                            </span>
                            <span className="flex-1">
                              {' '}
                              {item.department.join(',')}
                            </span>
                            <span className="flex-1" />
                          </div>
                          <div className="flex mt-2">
                            <span className="flex-1 font-bold">
                              Hours / Shift
                            </span>
                            <span className="flex-1 ">
                              {`${item.hours[0]} hours`} / {item.work_schedule}
                            </span>
                            <span className="flex-1" />
                          </div>
                          <div className="flex mt-2 ">
                            <span className="flex-1 font-bold"> Summary</span>
                            <span className="flex-1"> {item.description}</span>
                            <div className="flex-1 flex flex-col items-end">
                              <button
                                type="button"
                                className=" bg-blue-500 text-white py-2 px-2 rounded"
                              >
                                Job Details
                              </button>
                              <button
                                type="button"
                                className="bg-white border border-blue-500 py-2 px-2 mt-2 rounded"
                              >
                                Save Job
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          );
        })}
    </div>
  );
};

SearchResultData.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default SearchResultData;
