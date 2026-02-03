import axios from 'axios';

const API_BASE_URL = __DEV__ 
  ? 'http://192.168.1.7:5000/api'
  : 'https://your-backend.railway.app/api';

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  setAuthToken(token) {
    if (token) {
      this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.api.defaults.headers.common['Authorization'];
    }
  }

  // Auth endpoints
  async login(email, password) {
    try {
      const response = await this.api.post('/customer/login', { email, password });
      return response.data;
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  }

  async adminLogin(email, password) {
    try {
      const response = await this.api.post('/admin/login', { email, password });
      return response.data;
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Admin login failed' };
    }
  }

  async register(userData) {
    try {
      const response = await this.api.post('/customer/register', userData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Registration failed' };
    }
  }

  // Customer endpoints
  async getProfile() {
    try {
      const response = await this.api.get('/customer/profile');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to get profile' };
    }
  }

  async updateProfile(profileData) {
    try {
      const response = await this.api.put('/customer/profile', profileData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to update profile' };
    }
  }

  // Package endpoints
  async getPackages() {
    try {
      const response = await this.api.get('/packages');
      if (response.data.success) {
        return { success: true, data: response.data.data.packages };
      }
      return response.data;
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to get packages' };
    }
  }

  async getPackageDetails(id) {
    try {
      const response = await this.api.get(`/packages/${id}`);
      if (response.data.success) {
        return { success: true, data: response.data.data.package };
      }
      return response.data;
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to get package details' };
    }
  }

  async bookPackage(bookingData) {
    try {
      const response = await this.api.post('/packages/book', bookingData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to book package' };
    }
  }

  async getMyPackageBookings() {
    try {
      const response = await this.api.get('/packages/bookings/my');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to get bookings' };
    }
  }

  // Hotel endpoints
  async getHotels() {
    try {
      const response = await this.api.get('/hotels');
      if (response.data.success) {
        return { success: true, data: response.data.data.hotels };
      }
      return response.data;
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to get hotels' };
    }
  }

  async getHotelDetails(id) {
    try {
      const response = await this.api.get(`/hotels/${id}`);
      if (response.data.success) {
        return { success: true, data: response.data.data.hotel };
      }
      return response.data;
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to get hotel details' };
    }
  }

  async bookHotel(bookingData) {
    try {
      const response = await this.api.post('/hotels/book', bookingData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to book hotel' };
    }
  }

  async getMyHotelBookings() {
    try {
      const response = await this.api.get('/hotels/bookings/my');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to get hotel bookings' };
    }
  }

  // Destination endpoints
  async getDestinations() {
    try {
      const response = await this.api.get('/destinations');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to get destinations' };
    }
  }

  async getDestinationDetails(id) {
    try {
      const response = await this.api.get(`/destinations/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to get destination details' };
    }
  }

  // Admin endpoints
  async getDashboardStats() {
    try {
      const response = await this.api.get('/admin/dashboard');
      return response.data;
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to get dashboard stats' };
    }
  }

  async getAgents() {
    try {
      const response = await this.api.get('/admin/agents');
      return response.data;
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to get agents' };
    }
  }
}

export const apiService = new ApiService();