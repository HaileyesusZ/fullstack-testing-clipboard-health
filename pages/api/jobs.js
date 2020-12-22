// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import filters from '../../data/filters.json';
import jobs from '../../data/jobs.json';

const { Mutex } = require('async-mutex');

const mutex = new Mutex();

/**
 * find matching jobs from all jobs
 * @param {{filter:string, keyowrd:string}} matching criteria
 * @returns {array} array of matching jobs
 */
const findMatchingJobs = ({ filter, keyword }) => {
  const matchingJobs = [];
  jobs.forEach((job) => {
    let matchingItems = [];
    let keywordFound = false;

    if (filter) {
      matchingItems = job.items.filter((item) => {
        return item.job_type === filter;
      });
    }
    if (keyword) {
      keywordFound =
        job.job_title.includes(keyword) ||
        job.name.includes(keyword) ||
        job.items.some(
          (item) =>
            item.required_skills.includes(keyword) ||
            item.type.includes(keyword) ||
            item.job_title.includes(keyword) ||
            item.department.includes(keyword) ||
            item.description.includes(keyword)
        );
    }

    if (keyword && filter) {
      if (keywordFound && matchingItems.length) {
        const matchingJob = { ...job, items: matchingItems };
        matchingJob.total_jobs_in_hospital = matchingItems.length;
        matchingJobs.push(matchingJob);
      }

      return;
    }

    if (filter) {
      if (matchingItems.length) {
        const matchingJob = { ...job, items: matchingItems };
        matchingJob.total_jobs_in_hospital = matchingItems.length;
        matchingJobs.push(matchingJob);
      }
      return;
    }

    if (keyword) {
      if (keywordFound) {
        matchingJobs.push({ ...job });
      }
      return;
    }

    matchingJobs.push(job);
  });
  return matchingJobs;
};
export default async (req, res) => {
  let release;
  try {
    // Use Mutex to handle synchronization of responses
    release = await mutex.acquire();

    const { filter, sortBy, keyword } = req.query;

    // @todo: implement filters and search
    let matchingJobs = findMatchingJobs({ filter, keyword });
    matchingJobs = matchingJobs.sort();
    // @todo: implement automated tests

    // this timeout emulates unstable network connection, do not remove this one
    // you need to figure out how to guarantee that client side will render
    // correct results even if server-side can't finish replies in the right order
    await new Promise((resolve) => setTimeout(resolve, 1000 * Math.random()));

    return res.json(matchingJobs);
  } catch (error) {
    return res.status(500).json({
      message: `A server error occurred ${error.message}`,
    });
  } finally {
    if (release) {
      release();
    }
  }
};
