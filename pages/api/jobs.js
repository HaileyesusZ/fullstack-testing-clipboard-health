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
        return (
          item.job_type === filter ||
          item.work_schedule === filter ||
          item.experience === filter ||
          item.department.includes(filter)
        );
      });
    }
    if (keyword) {
      keywordFound =
        job.job_title.toLowerCase().includes(keyword) ||
        job.name.toLowerCase().includes(keyword) ||
        job.items.some(
          (item) =>
            item.required_skills.includes(keyword) ||
            item.type.toLowerCase().includes(keyword) ||
            item.job_title.toLowerCase().includes(keyword) ||
            item.department.includes(keyword) ||
            item.description.toLowerCase().includes(keyword)
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

/**
 * sorts jobs with the passed conditions
 * @param {array} jobs jobs to sort
 * @param {object} conditions sort conditions
 * @returns {array} sorted jobs
 */
const sortJobs = (jobsToSort, conditions = {}) => {
  const sortedJobs = [];

  [...jobsToSort].forEach((job) => {
    const sortedJob = { ...job };

    const sortedItems = [...sortedJob.items].sort((previousItem, nextItem) => {
      const locationSort = conditions.location === 'asc';
      const roleSort = conditions.role === 'asc';
      const departmentSort = conditions.department === 'asc';
      const educationSort = conditions.education === 'asc';
      const experienceSort = conditions.experience === 'asc';

      try {
        if (conditions.location) {
          if (previousItem.location > nextItem.location)
            return locationSort ? 1 : -1;
          if (previousItem.location < nextItem.location)
            return locationSort ? -1 : 1;
        }

        if (previousItem.job_title > nextItem.job_title)
          return roleSort ? 1 : -1;
        if (previousItem.job_title < nextItem.job_title)
          return roleSort ? -1 : 1;

        if (conditions.department) {
          if (previousItem.department.length > nextItem.department.length)
            return departmentSort ? 1 : -1;
          if (previousItem.department.length < nextItem.department.length)
            return departmentSort ? -1 : 1;
        }
        if (conditions.education) {
          if (previousItem.required_skills > nextItem.required_skills)
            return educationSort ? 1 : -1;
          if (previousItem.required_skills < nextItem.required_skills)
            return educationSort ? -1 : 1;
        }
        if (conditions.experience) {
          if (previousItem.experience > nextItem.experience)
            return experienceSort ? 1 : -1;
          if (previousItem.experience < nextItem.experience)
            return experienceSort ? -1 : 1;
        }
        return 0;
      } catch (error) {
        return 0;
      }
    });
    sortedJob.items = sortedItems;
    sortedJobs.push(sortedJob);
  });

  return sortedJobs;
};
export default async (req, res) => {
  let release;
  try {
    if (req.method === 'POST') {
      // Use Mutex to handle synchronization of responses
      release = await mutex.acquire();

      const { filter, sortBy = {}, keyword } = JSON.parse(req.body || {});

      // @todo: implement filters and search
      let matchingJobs = findMatchingJobs({
        filter,
        keyword,
      });
      matchingJobs = sortJobs(matchingJobs, sortBy);
      // @todo: implement automated tests

      // this timeout emulates unstable network connection, do not remove this one
      // you need to figure out how to guarantee that client side will render
      // correct results even if server-side can't finish replies in the right order
      await new Promise((resolve) => setTimeout(resolve, 1000 * Math.random()));

      return res.json(matchingJobs);
    }
    return res.status(405).json({ message: 'method not allowed' });
  } catch (error) {
    return res.status(500).json({
      message: `A server error occurred ${error.message} `,
    });
  } finally {
    if (release) {
      release();
    }
  }
};
