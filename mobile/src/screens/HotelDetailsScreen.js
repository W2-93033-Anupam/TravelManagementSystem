import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Button, Card, TextInput, Chip } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { apiService } from '../services/apiService';
import { useAuth } from '../context/AuthContext';
import DatePickerModal from '../components/DatePickerModal';

const HotelDetailsScreen = ({ route, navigation }) => {
  const { hotelId } = route.params;
  const { user } = useAuth();
  const [hotelData, setHotelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [checkinDate, setCheckinDate] = useState('');
  const [checkoutDate, setCheckoutDate] = useState('');
  const [showCheckinPicker, setShowCheckinPicker] = useState(false);
  const [showCheckoutPicker, setShowCheckoutPicker] = useState(false);
  const [rooms, setRooms] = useState('1');

  useEffect(() => {
    fetchHotelDetails();
  }, []);

  const fetchHotelDetails = async () => {
    try {
      const response = await apiService.getHotelDetails(hotelId);
      if (response.success) {
        setHotelData(response.data);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: response.message,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to load hotel details',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!user) {
      Alert.alert('Login Required', 'Please login to book hotels');
      return;
    }

    setBooking(true);
    try {
      const bookingData = {
        hotel_id: hotelId,
        checkin_date: checkinDate || new Date().toISOString().split('T')[0],
        checkout_date: checkoutDate || new Date().toISOString().split('T')[0],
        num_rooms: parseInt(rooms),
        total_amount: hotelData.price_per_night * parseInt(rooms),
      };

      const response = await apiService.bookHotel(bookingData);
      if (response.success) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Hotel booked successfully!',
        });
        navigation.navigate('Bookings');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: response.message,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to book hotel',
      });
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!hotelData) {
    return (
      <View style={styles.centered}>
        <Text>Hotel not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: hotelData.image_url || 'https://via.placeholder.com/400x200' }}
        style={styles.image}
      />
      
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>{hotelData.name}</Text>
          <Text style={styles.location}>📍 {hotelData.location}</Text>
          <Text style={styles.price}>₹{hotelData.price_per_night?.toLocaleString()}/night</Text>
          <Text style={styles.rating}>⭐ {hotelData.rating}/5</Text>
          <Text style={styles.description}>{hotelData.description}</Text>
          
          {hotelData.amenities && (
            <View style={styles.amenitiesContainer}>
              <Text style={styles.amenitiesTitle}>Amenities:</Text>
              <View style={styles.amenitiesChips}>
                {hotelData.amenities.split(',').map((amenity, index) => (
                  <Chip key={index} style={styles.amenityChip}>
                    {amenity.trim()}
                  </Chip>
                ))}
              </View>
            </View>
          )}
        </Card.Content>
      </Card>

      <Card style={styles.bookingCard}>
        <Card.Content>
          <Text style={styles.bookingTitle}>Book This Hotel</Text>
          
          <TouchableOpacity 
            style={styles.dateButton}
            onPress={() => setShowCheckinPicker(true)}
          >
            <Text>Check-in: {checkinDate || 'Select Date'}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.dateButton}
            onPress={() => setShowCheckoutPicker(true)}
          >
            <Text>Check-out: {checkoutDate || 'Select Date'}</Text>
          </TouchableOpacity>
          
          <TextInput
            label="Number of Rooms"
            value={rooms}
            onChangeText={setRooms}
            keyboardType="numeric"
            style={styles.input}
          />
          
          <Text style={styles.totalAmount}>
            Total Amount: ₹{(hotelData.price_per_night * parseInt(rooms || 1))?.toLocaleString()}
          </Text>
          
          <Button
            mode="contained"
            onPress={handleBooking}
            loading={booking}
            disabled={booking}
            style={styles.bookButton}
          >
            Book Now
          </Button>
        </Card.Content>
      </Card>
      
      <DatePickerModal
        visible={showCheckinPicker}
        onClose={() => setShowCheckinPicker(false)}
        onDateSelect={setCheckinDate}
        title="Select Check-in Date"
      />
      
      <DatePickerModal
        visible={showCheckoutPicker}
        onClose={() => setShowCheckoutPicker(false)}
        onDateSelect={setCheckoutDate}
        title="Select Check-out Date"
      />
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
  },
  image: {
    width: '100%',
    height: 200,
  },
  card: {
    margin: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  amenitiesContainer: {
    marginTop: 16,
  },
  amenitiesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  amenitiesChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  amenityChip: {
    backgroundColor: '#e8f5e8',
    marginBottom: 8,
  },
  bookingCard: {
    margin: 16,
    marginTop: 0,
  },
  bookingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  dateButton: {
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    marginBottom: 16,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#4CAF50',
  },
  bookButton: {
    marginTop: 8,
  },
});

export default HotelDetailsScreen;