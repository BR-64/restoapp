import axios from 'axios';
import { API_URL } from '../../config';

const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/products/list`, {
      header: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default getProducts;
