import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import SearchResultHeader from '../components/SearchResultHeader';
import SearchResultData from '../components/SearchResultData';

const Home = ({ initialFilters = {}, initialResults = [] }) => {
  const [showModal, setShowModal] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState({});
  const [results, setResults] = useState(initialResults);
  const [totalResults, setTotalResults] = useState(0);

  const handleSetFilter = (filterName) => {
    if (filterName === filter) {
      setFilter('');
    } else {
      setFilter(filterName);
    }
    setShowModal(false);
  };

  const handleSetKeyword = (searchKeyword) => {
    setKeyword(searchKeyword);
  };

  const handleSetSortBy = (sortName, value) => {
    const updatedSort = { ...sortBy };
    if (updatedSort[sortName] === value) {
      updatedSort[sortName] = null;
      setSortBy(updatedSort);
    } else {
      updatedSort[sortName] = value;
      setSortBy(updatedSort);
    }
  };

  const handleShowMore = (openModal) => {
    setShowModal(openModal);
  };

  useEffect(async () => {
    const data = { sortBy };
    if (filter) data.filter = filter;
    if (keyword) data.keyword = keyword;
    const result = await fetch(`${window.location.href}api/jobs`, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    const resultsData = await result.json();

    const totalResultCount = resultsData.reduce((acc, item) => {
      return acc + parseInt(item.total_jobs_in_hospital, 10);
    }, 0);

    setResults(resultsData);
    setTotalResults(totalResultCount);
  }, [keyword, filter, sortBy]);

  return (
    <Layout
      activeFilter={filter}
      filters={initialFilters}
      showModal={showModal}
      handleShowMore={handleShowMore}
      setFilter={handleSetFilter}
      setKeyword={handleSetKeyword}
    >
      <div className="bg-white py-4 px-6 mt-4 ml-4 flex-grow ">
        <SearchResultHeader
          totalResults={totalResults}
          setSortBy={handleSetSortBy}
          sortBy={sortBy}
        />
        <SearchResultData results={results} />
      </div>
    </Layout>
  );
};

const getServerSideProps = async (context) => {
  const { req } = context;
  let initialFilters;
  let initialResults;
  try {
    const [filterData, resultData] = await Promise.all([
      fetch(`http://${req.headers.host}/api/filters`),
      fetch(`http://${req.headers.host}/api/jobs`, {
        method: 'POST',
        body: JSON.stringify({}),
      }),
    ]);

    [initialFilters, initialResults] = await Promise.all([
      filterData.json(),
      resultData.json(),
    ]);
  } catch (error) {
    initialFilters = {};
    initialResults = [];
  }

  return { props: { initialFilters, initialResults } };
};

Home.propTypes = {
  initialFilters: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        doc_count: PropTypes.number.isRequired,
      })
    )
  ).isRequired,
  initialResults: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any))
    .isRequired,
};

export { getServerSideProps };
export default Home;
