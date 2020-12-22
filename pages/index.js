import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import NavBar from '../components/NavBar';
import SearchResultHeader from '../components/SearchResultHeader';
import SearchResultData from '../components/SearchResultData';

const Home = ({ filters, results }) => {
  useEffect(() => {}, []);

  useEffect(() => {}, results);
  // const totalResults = results.reduce((acc, item) => {}, 0);

  return (
    <Layout filters={filters}>
      <div className="bg-white py-4 px-6 mt-4 ml-4 flex-grow ">
        <SearchResultHeader />
        <SearchResultData results={results} />
      </div>
    </Layout>
  );
};

const getServerSideProps = async (context) => {
  const { req } = context;

  const [filterData, resultData] = await Promise.all([
    fetch(`http://${req.headers.host}/api/filters`),
    fetch(`http://${req.headers.host}/api/jobs`),
  ]);

  const [filters, results] = await Promise.all([
    filterData.json(),
    resultData.json(),
  ]);

  return { props: { filters, results } };
};

export { getServerSideProps };
export default Home;
