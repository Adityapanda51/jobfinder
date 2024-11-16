
// import PropTypes from 'prop-types';

// const JobList = ({ jobs }) => {
//   return (
//     <div>
//       <h2>Job Listings</h2>
//       <ul className="job-list">
//         {jobs.length === 0 ? (
//           <li>No jobs found for your search criteria.</li>
//         ) : (
//           jobs.map((job) => (
//             <li key={job.id}>
//               <h3>{job.title}</h3>
//               <p><strong>Location:</strong> {job.location}</p>
//               <p>{job.description}</p>
//               <p><strong>Source:</strong> {job.source}</p>
//               <a href={job.url} target="_blank" rel="noopener noreferrer">Apply Now</a>
//             </li>
//           ))
//         )}
//       </ul>
//     </div>
//   );
// };

// // Add prop validation for jobs prop
// JobList.propTypes = {
//   jobs: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//       title: PropTypes.string.isRequired,
//       description: PropTypes.string,
//       location: PropTypes.string,
//       url: PropTypes.string,
//       source: PropTypes.string
//     })
//   ).isRequired
// };

// export default JobList;




import PropTypes from 'prop-types';

const JobList = ({ jobs }) => {
  return (
    <div>
      {jobs.length > 0 && (
        <>
          <h2>Job Listings</h2>
          <ul className="job-list">
            {jobs.map((job) => (
              <li key={job.id}>
                <h3>{job.title}</h3>
                <p><strong>Location:</strong> {job.location}</p>
                <p>{job.description}</p>
                <p><strong>Source:</strong> {job.source}</p>
                <a href={job.url} target="_blank" rel="noopener noreferrer">Apply Now</a>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

// Add prop validation for jobs prop
JobList.propTypes = {
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      location: PropTypes.string,
      url: PropTypes.string,
      source: PropTypes.string
    })
  ).isRequired
};

export default JobList;
