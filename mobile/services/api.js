import axios from 'axios';


const BASE_URL = 'http://0.0.0.0:3001';  // Replace with your machine's IP

export const getFare = async (lat1, lon1, lat2, lon2, passengerType = 'regular') => {
  try {
    const response = await axios.get(`${BASE_URL}/api/fare`, {
      params: {
        lat1,
        lon1,
        lat2,
        lon2,
        passenger_type: passengerType,
      },
    });
    return response.data;
  } catch (err) {
    if (err.response) {
      // Server responded with a status other than 2xx
      console.error('Error response:', err.response.status, err.response.data);
    } else if (err.request) {
      // Request was made but no response received
      console.error('No response received:', err.request);
    } else {
      // Something else happened
      console.error('Error setting up request:', err.message);
    }
    return { error: true };
  }
};