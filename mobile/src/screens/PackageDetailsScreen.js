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
import { Button, Card, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { apiService } from '../services/apiService';
import { useAuth } from '../context/AuthContext';
import DatePickerModal from '../components/DatePickerModal';

const PackageDetailsScreen = ({ route, navigation }) => {
  const { packageId } = route.params;
  const { user } = useAuth();
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [guests, setGuests] = useState('2');

  useEffect(() => {
    fetchPackageDetails();
  }, []);

  const fetchPackageDetails = async () => {
    try {
      const response = await apiService.getPackageDetails(packageId);
      if (response.success) {
        setPackageData(response.data);
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
        text2: 'Failed to load package details',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!user) {
      Alert.alert('Login Required', 'Please login to book packages');
      return;
    }

    setBooking(true);
    try {
      const bookingData = {
        package_id: packageId,
        start_date: startDate || new Date().toISOString().split('T')[0],
        end_date: endDate || new Date().toISOString().split('T')[0],
        number_of_guests: parseInt(guests),
        total_amount: packageData.price * parseInt(guests),
      };

      const response = await apiService.bookPackage(bookingData);
      if (response.success) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Package booked successfully!',
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
        text2: 'Failed to book package',
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

  if (!packageData) {
    return (
      <View style={styles.centered}>
        <Text>Package not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: packageData.image_url || 'https://via.placeholder.com/400x200' }}
        style={styles.image}
      />
      
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>{packageData.title}</Text>
          <Text style={styles.price}>₹{packageData.price?.toLocaleString()}</Text>
          <Text style={styles.description}>{packageData.description}</Text>
          
          <View style={styles.details}>
            <Text style={styles.detailText}>Duration: {packageData.duration_days} days</Text>
            <Text style={styles.detailText}>Destination: {packageData.destination}</Text>
            <Text style={styles.detailText}>Includes: {packageData.includes}</Text>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.bookingCard}>
        <Card.Content>
          <Text style={styles.bookingTitle}>Book This Package</Text>
          
          <TouchableOpacity 
            style={styles.dateButton}
            onPress={() => setShowStartPicker(true)}
          >
            <Text>Start Date: {startDate || 'Select Date'}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.dateButton}
            onPress={() => setShowEndPicker(true)}
          >
            <Text>End Date: {endDate || 'Select Date'}</Text>
          </TouchableOpacity>
          
          <TextInput
            label="Number of Guests"
            value={guests}
            onChangeText={setGuests}
            keyboardType="numeric"
            style={styles.input}
          />
          
          <Text style={styles.totalAmount}>
            Total Amount: ₹{(packageData.price * parseInt(guests || 1))?.toLocaleString()}
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
        visible={showStartPicker}
        onClose={() => setShowStartPicker(false)}
        onDateSelect={setStartDate}
        title="Select Start Date"
      />
      
      <DatePickerModal
        visible={showEndPicker}
        onClose={() => setShowEndPicker(false)}
        onDateSelect={setEndDate}
        title="Select End Date"
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
  price: {
    fontSize: 20,
    color: '#2196F3',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  details: {
    marginTop: 16,
  },
  detailText: {
    fontSize: 14,
    marginBottom: 8,
    color: '#666',
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
    color: '#2196F3',
  },
  bookButton: {
    marginTop: 8,
  },
});

export default PackageDetailsScreen;