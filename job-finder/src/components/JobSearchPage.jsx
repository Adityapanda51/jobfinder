import { useState } from 'react';
import JobList from './JobList';
import { fetchAllJobs } from '../api/jobApi';
import './JobSearchPage.css';

const JobSearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return; // Prevent empty search
    setLoading(true);
    setError(null);
    try {
      const fetchedJobs = await fetchAllJobs(searchTerm);
      setJobs(fetchedJobs);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('Failed to fetch jobs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <h1>Job Search</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter job title, keyword, or company"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress} // Listen for Enter key press
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p>Loading jobs...</p>}
      {error && <p>{error}</p>}
      <JobList jobs={jobs} />
    </div>
  );
};

export default JobSearchPage;
