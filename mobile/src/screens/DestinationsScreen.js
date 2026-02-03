import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Card, Searchbar, ActivityIndicator } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { apiService } from '../services/apiService';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2;

const DestinationsScreen = ({ navigation }) => {
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchDestinations();
  }, []);

  useEffect(() => {
    filterDestinations();
  }, [searchQuery, destinations]);

  const fetchDestinations = async () => {
    try {
      const response = await apiService.getDestinations();
      if (response.success) {
        setDestinations(response.data);
        setFilteredDestinations(response.data);
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
        text2: 'Failed to load destinations',
      });
    } finally {
      setLoading(false);
    }
  };

  const filterDestinations = () => {
    if (!searchQuery) {
      setFilteredDestinations(destinations);
      return;
    }

    const filtered = destinations.filter(
      (destination) =>
        destination.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        destination.country?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        destination.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDestinations(filtered);
  };

  const renderDestinationCard = ({ item }) => (
    <TouchableOpacity style={styles.destinationCard}>
      <Image
        source={{ uri: item.image_url || 'https://via.placeholder.com/200x150' }}
        style={styles.destinationImage}
      />
      <View style={styles.destinationOverlay}>
        <Text style={styles.destinationName}>{item.name}</Text>
        <Text style={styles.destinationCountry}>{item.country}</Text>
      </View>
      {item.description && (
        <View style={styles.destinationInfo}>
          <Text style={styles.destinationDescription} numberOfLines={2}>
            {item.description}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading destinations...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search destinations, countries..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />
      </View>

      <FlatList
        data={filteredDestinations}
        renderItem={renderDestinationCard}
        keyExtractor={(item) => item.destination_id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No destinations found</Text>
            <Text style={styles.emptyMessage}>
              {searchQuery ? 'Try adjusting your search terms' : 'No destinations available at the moment'}
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
  row: {
    justifyContent: 'space-between',
  },
  destinationCard: {
    width: cardWidth,
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 3,
    overflow: 'hidden',
  },
  destinationImage: {
    width: '100%',
    height: 120,
  },
  destinationOverlay: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 8,
  },
  destinationName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  destinationCountry: {
    color: 'white',
    fontSize: 12,
    opacity: 0.9,
  },
  destinationInfo: {
    padding: 12,
  },
  destinationDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
    width: width - 32,
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

export default DestinationsScreen;