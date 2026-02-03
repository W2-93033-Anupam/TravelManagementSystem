import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { Card, Button, Chip, Divider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { apiService } from '../services/apiService';
import { useAuth } from '../context/AuthContext';

const BookingsScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [packageBookings, setPackageBookings] = useState([]);
  const [hotelBookings, setHotelBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      const [packageResponse, hotelResponse] = await Promise.all([
        apiService.getMyPackageBookings(),
        apiService.getMyHotelBookings(),
      ]);

      if (packageResponse.success) {
        setPackageBookings(packageResponse.data);
      }

      if (hotelResponse.success) {
        setHotelBookings(hotelResponse.data);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to load bookings',
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchBookings();
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return '#4CAF50';
      case 'pending':
        return '#FF9800';
      case 'cancelled':
        return '#F44336';
      default:
        return '#757575';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const renderPackageBooking = (booking) => (
    <Card key={booking.booking_id} style={styles.bookingCard}>
      <Card.Content>
        <View style={styles.bookingHeader}>
          <Text style={styles.bookingTitle}>{booking.package_name}</Text>
          <Chip
            style={[styles.statusChip, { backgroundColor: getStatusColor(booking.status) }]}
            textStyle={{ color: 'white' }}
          >
            {booking.status || 'Confirmed'}
          </Chip>
        </View>
        
        <Text style={styles.bookingDetail}>
          📅 {formatDate(booking.start_date)} - {formatDate(booking.end_date)}
        </Text>
        <Text style={styles.bookingDetail}>
          👥 {booking.number_of_guests} guests
        </Text>
        <Text style={styles.bookingDetail}>
          💰 ₹{booking.total_amount}
        </Text>
        <Text style={styles.bookingDetail}>
          📍 {booking.destination}
        </Text>
        
        <View style={styles.bookingActions}>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('PackageDetails', { packageId: booking.package_id })}
            style={styles.actionButton}
          >
            View Details
          </Button>
        </View>
      </Card.Content>
    </Card>
  );

  const renderHotelBooking = (booking) => (
    <Card key={booking.booking_id} style={styles.bookingCard}>
      <Card.Content>
        <View style={styles.bookingHeader}>
          <Text style={styles.bookingTitle}>{booking.hotel_name}</Text>
          <Chip
            style={[styles.statusChip, { backgroundColor: getStatusColor(booking.status) }]}
            textStyle={{ color: 'white' }}
          >
            {booking.status || 'Confirmed'}
          </Chip>
        </View>
        
        <Text style={styles.bookingDetail}>
          📅 {formatDate(booking.check_in_date)} - {formatDate(booking.check_out_date)}
        </Text>
        <Text style={styles.bookingDetail}>
          👥 {booking.number_of_guests} guests • 🏠 {booking.number_of_rooms} rooms
        </Text>
        <Text style={styles.bookingDetail}>
          💰 ₹{booking.total_amount}
        </Text>
        <Text style={styles.bookingDetail}>
          📍 {booking.location}
        </Text>
        
        <View style={styles.bookingActions}>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('HotelDetails', { hotelId: booking.hotel_id })}
            style={styles.actionButton}
          >
            View Details
          </Button>
        </View>
      </Card.Content>
    </Card>
  );

  if (!user) {
    return (
      <View style={styles.centered}>
        <Text style={styles.message}>Please login to view your bookings</Text>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Login')}
          style={styles.loginButton}
        >
          Login
        </Button>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text>Loading bookings...</Text>
      </View>
    );
  }

  const hasBookings = packageBookings.length > 0 || hotelBookings.length > 0;

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {!hasBookings ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No Bookings Yet</Text>
          <Text style={styles.emptyMessage}>
            Start exploring packages and hotels to make your first booking!
          </Text>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Packages')}
            style={styles.exploreButton}
          >
            Explore Packages
          </Button>
        </View>
      ) : (
        <>
          {packageBookings.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Package Bookings</Text>
              {packageBookings.map(renderPackageBooking)}
            </View>
          )}

          {packageBookings.length > 0 && hotelBookings.length > 0 && (
            <Divider style={styles.divider} />
          )}

          {hotelBookings.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Hotel Bookings</Text>
              {hotelBookings.map(renderHotelBooking)}
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  loginButton: {
    marginTop: 10,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    marginTop: 100,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  emptyMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    color: '#666',
    lineHeight: 24,
  },
  exploreButton: {
    marginTop: 10,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  bookingCard: {
    marginBottom: 16,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  bookingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10,
  },
  statusChip: {
    borderRadius: 16,
  },
  bookingDetail: {
    fontSize: 14,
    marginBottom: 6,
    color: '#666',
  },
  bookingActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  actionButton: {
    marginLeft: 8,
  },
  divider: {
    marginVertical: 8,
  },
});

export default BookingsScreen;