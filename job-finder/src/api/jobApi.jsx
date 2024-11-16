
import axios from 'axios';

const ADZUNA_APP_ID = '5995a993';
const ADZUNA_APP_KEY = 'fa5d3bec5d5ead822da72c451629519d';
const JOOBLE_API_KEY = 'b2b3dc5c-620c-468a-b8c3-5b97b2f1f7c4';

// List of visa sponsorship keywords
const visaKeywords = [
  'visa sponsorship',
  'visa provided',
  'work visa',
  'sponsorship available',
  'work permit',
  'H-1B visa',
  'relocation assistance',
  'visa required',
  'sponsored work visa'
];

const generateQuery = (keywords) => keywords.join(' OR ');

export const fetchAdzunaJobs = async (searchTerm) => {
  const query = searchTerm || generateQuery(visaKeywords);
  const response = await axios.get(
    `https://api.adzuna.com/v1/api/jobs/gb/search/1`,
    {
      params: {
        app_id: ADZUNA_APP_ID,
        app_key: ADZUNA_APP_KEY,
        what: query,
        where: 'UK'
      }
    }
  );
  return response.data.results.map((job) => ({
    id: job.id,
    title: job.title,
    description: job.description,
    location: job.location.display_name,
    salary: job.salary_min && job.salary_max
      ? `£${job.salary_min} - £${job.salary_max}`
      : 'Salary not provided', // Handling salary if available
    url: job.redirect_url,
    source: 'Adzuna'
  }));
};

export const fetchJoobleJobs = async (searchTerm) => {
  const response = await axios.post(
    `https://jooble.org/api/${JOOBLE_API_KEY}`,
    { keywords: searchTerm || generateQuery(visaKeywords), location: 'UK' },
    { headers: { 'Content-Type': 'application/json' } }
  );

  const parser = new DOMParser();
  return response.data.jobs.map((job) => ({
    id: job.id,
    title: job.title,
    description: parser.parseFromString(job.snippet, 'text/html').body.textContent.trim(), // Extract plain text only
    location: job.location,
    salary: job.salary && job.salary !== '' ? job.salary : 'Salary not provided', // Handle salary if available
    url: job.link,
    source: 'Jooble'
  }));
};

export const fetchAllJobs = async (searchTerm) => {
  try {
    const [adzunaJobs, joobleJobs] = await Promise.all([
      fetchAdzunaJobs(searchTerm),
      fetchJoobleJobs(searchTerm)
    ]);
    return [...adzunaJobs, ...joobleJobs];
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
};
