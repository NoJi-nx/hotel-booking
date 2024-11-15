export const BASE_URL = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_BASE_URL  // Use environment variable for production
  : 'http://localhost:4000/api/v1'; // Use local URL for development