import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Card, Searchbar, Chip, ActivityIndicator } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { apiService } from '../services/apiService';

const HotelsScreen = ({ navigation }) => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchHotels();
  }, []);

  useEffect(() => {
    filterHotels();
  }, [searchQuery, hotels]);

  const fetchHotels = async () => {
    try {
      const response = await apiService.getHotels();
      if (response.success) {
        setHotels(response.data);
        setFilteredHotels(response.data);
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
        text2: 'Failed to load hotels',
      });
    } finally {
      setLoading(false);
    }
  };

  const filterHotels = () => {
    if (!searchQuery) {
      setFilteredHotels(hotels);
      return;
    }

    const filtered = hotels.filter(
      (hotel) =>
        hotel.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredHotels(filtered);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    if (hasHalfStar) {
      stars.push('⭐');
    }
    return stars.join('');
  };

  const renderHotelCard = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('HotelDetails', { hotelId: item.hotel_id })}
    >
      <Card style={styles.hotelCard}>
        <Image
          source={{ uri: item.image_url || 'https://via.placeholder.com/300x150' }}
          style={styles.hotelImage}
        />
        <Card.Content style={styles.cardContent}>
          <Text style={styles.hotelTitle}>{item.name}</Text>
          <Text style={styles.hotelLocation}>📍 {item.location}</Text>
          
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingStars}>{renderStars(item.rating)}</Text>
            <Text style={styles.ratingText}>{item.rating}/5</Text>
          </View>

          <Text style={styles.hotelDescription} numberOfLines={2}>
            {item.description}
          </Text>
          
          <View style={styles.hotelDetails}>
            <View style={styles.priceContainer}>
              <Text style={styles.hotelPrice}>₹{item.price_per_night?.toLocaleString()}</Text>
              <Text style={styles.priceLabel}>per night</Text>
            </View>
          </View>

          {item.amenities && (
            <View style={styles.amenitiesContainer}>
              <Text style={styles.amenitiesLabel}>Amenities:</Text>
              <View style={styles.amenitiesChips}>
                {item.amenities.split(',').slice(0, 3).map((amenity, index) => (
                  <Chip key={index} style={styles.amenityChip}>
                    {amenity.trim()}
                  </Chip>
                ))}
                {item.amenities.split(',').length > 3 && (
                  <Chip style={styles.amenityChip}>
                    +{item.amenities.split(',').length - 3} more
                  </Chip>
                )}
              </View>
            </View>
          )}
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading hotels...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search hotels, locations..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />
      </View>

      <FlatList
        data={filteredHotels}
        renderItem={renderHotelCard}
        keyExtractor={(item) => item.hotel_id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No hotels found</Text>
            <Text style={styles.emptyMessage}>
              {searchQuery ? 'Try adjusting your search terms' : 'No hotels available at the moment'}
            </Text>
          </View>
        }
      />
    </View>
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
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: 'white',
    elevation: 2,
  },
  searchbar: {
    elevation: 0,
    backgroundColor: '#f0f0f0',
  },
  listContainer: {
    padding: 16,
  },
  hotelCard: {
    marginBottom: 16,
    elevation: 3,
    borderRadius: 12,
    overflow: 'hidden',
  },
  hotelImage: {
    width: '100%',
    height: 150,
  },
  cardContent: {
    padding: 16,
  },
  hotelTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  hotelLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingStars: {
    fontSize: 16,
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  hotelDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
    marginBottom: 12,
  },
  hotelDetails: {
    marginBottom: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'flex-end',
  },
  hotelPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  priceLabel: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  amenitiesContainer: {
    backgroundColor: '#f8f9fa',
    padding: 8,
    borderRadius: 8,
  },
  amenitiesLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  amenitiesChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  amenityChip: {
    backgroundColor: '#e8f5e8',
    height: 24,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  emptyMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default HotelsScreen;