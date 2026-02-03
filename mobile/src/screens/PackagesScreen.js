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

const PackagesScreen = ({ navigation }) => {
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPackages();
  }, []);

  useEffect(() => {
    filterPackages();
  }, [searchQuery, packages]);

  const fetchPackages = async () => {
    try {
      const response = await apiService.getPackages();
      if (response.success) {
        setPackages(response.data);
        setFilteredPackages(response.data);
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
        text2: 'Failed to load packages',
      });
    } finally {
      setLoading(false);
    }
  };

  const filterPackages = () => {
    if (!searchQuery) {
      setFilteredPackages(packages);
      return;
    }

    const filtered = packages.filter(
      (pkg) =>
        pkg.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.destination?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPackages(filtered);
  };

  const renderPackageCard = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('PackageDetails', { packageId: item.package_id })}
    >
      <Card style={styles.packageCard}>
        <Image
          source={{ uri: item.image_url || 'https://via.placeholder.com/300x150' }}
          style={styles.packageImage}
        />
        <Card.Content style={styles.cardContent}>
          <Text style={styles.packageTitle}>{item.title}</Text>
          <Text style={styles.packageDestination}>📍 {item.destination}</Text>
          <Text style={styles.packageDescription} numberOfLines={2}>
            {item.description}
          </Text>
          
          <View style={styles.packageDetails}>
            <View style={styles.detailRow}>
              <Chip icon="calendar" style={styles.detailChip}>
                {item.duration_days} days
              </Chip>
              <Chip icon="account-group" style={styles.detailChip}>
                Max {item.max_people || 'N/A'} people
              </Chip>
            </View>
            
            <View style={styles.priceContainer}>
              <Text style={styles.packagePrice}>₹{item.price?.toLocaleString()}</Text>
              <Text style={styles.priceLabel}>per person</Text>
            </View>
          </View>

          {item.includes && (
            <View style={styles.includesContainer}>
              <Text style={styles.includesLabel}>Includes:</Text>
              <Text style={styles.includesText} numberOfLines={1}>
                {item.includes}
              </Text>
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
        <Text style={styles.loadingText}>Loading packages...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search packages, destinations..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />
      </View>

      <FlatList
        data={filteredPackages}
        renderItem={renderPackageCard}
        keyExtractor={(item) => item.package_id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No packages found</Text>
            <Text style={styles.emptyMessage}>
              {searchQuery ? 'Try adjusting your search terms' : 'No packages available at the moment'}
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
  packageCard: {
    marginBottom: 16,
    elevation: 3,
    borderRadius: 12,
    overflow: 'hidden',
  },
  packageImage: {
    width: '100%',
    height: 150,
  },
  cardContent: {
    padding: 16,
  },
  packageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  packageDestination: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  packageDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
    marginBottom: 12,
  },
  packageDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
    gap: 8,
  },
  detailChip: {
    backgroundColor: '#e3f2fd',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'flex-end',
  },
  packagePrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  priceLabel: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  includesContainer: {
    backgroundColor: '#f8f9fa',
    padding: 8,
    borderRadius: 8,
  },
  includesLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  includesText: {
    fontSize: 12,
    color: '#666',
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

export default PackagesScreen;