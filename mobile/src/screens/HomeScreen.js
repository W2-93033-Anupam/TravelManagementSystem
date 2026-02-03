import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import {
  Title,
  Paragraph,
  Card,
  Button,
  Chip,
  ActivityIndicator,
} from 'react-native-paper';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/apiService';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();
  const [featuredPackages, setFeaturedPackages] = useState([]);
  const [featuredHotels, setFeaturedHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedContent();
  }, []);

  const loadFeaturedContent = async () => {
    try {
      const [packagesResult, hotelsResult] = await Promise.all([
        apiService.getPackages(),
        apiService.getHotels(),
      ]);

      if (packagesResult.success && packagesResult.data) {
        const packages = Array.isArray(packagesResult.data) ? packagesResult.data : packagesResult.data.packages || [];
        setFeaturedPackages(packages.slice(0, 3));
      }

      if (hotelsResult.success && hotelsResult.data) {
        const hotels = Array.isArray(hotelsResult.data) ? hotelsResult.data : hotelsResult.data.hotels || [];
        setFeaturedHotels(hotels.slice(0, 3));
      }
    } catch (error) {
      console.error('Error loading featured content:', error);
    } finally {
      setLoading(false);
    }
  };

  const navigateToTab = (tabName) => {
    // Get the parent navigator (MainTabs)
    const parentNavigation = navigation.getParent();
    if (parentNavigation) {
      parentNavigation.navigate(tabName);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.welcomeTitle}>
          Welcome back, {user?.full_name?.split(' ')[0]}!
        </Title>
        <Paragraph style={styles.welcomeSubtitle}>
          Discover amazing travel experiences
        </Paragraph>
      </View>

      <View style={styles.quickActions}>
        <Button
          mode="contained"
          onPress={() => {}}
          style={styles.actionButton}
          icon="bag-suitcase"
        >
          Browse Packages
        </Button>
        <Button
          mode="outlined"
          onPress={() => {}}
          style={styles.actionButton}
          icon="home-city"
        >
          Find Hotels
        </Button>
      </View>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Featured Packages</Title>
        {featuredPackages.map((pkg) => (
          <Card key={pkg.package_id} style={styles.card}>
            <Card.Content>
              <Title style={styles.cardTitle}>{pkg.title}</Title>
              <Paragraph numberOfLines={2}>{pkg.description}</Paragraph>
              <View style={styles.cardDetails}>
                <Chip icon="calendar" style={styles.chip}>
                  {pkg.duration_days} days
                </Chip>
                <Chip icon="currency-inr" style={styles.chip}>
                  ₹{pkg.price?.toLocaleString()}
                </Chip>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button
                onPress={() => {
                  try {
                    navigation.navigate('PackageDetails', { packageId: pkg.package_id });
                  } catch (error) {
                    console.log('Navigation error:', error);
                  }
                }}
              >
                View Details
              </Button>
            </Card.Actions>
          </Card>
        ))}
        <Button
          mode="text"
          onPress={() => {}}
          style={styles.viewAllButton}
        >
          View All Packages
        </Button>
      </View>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Featured Hotels</Title>
        {featuredHotels.map((hotel) => (
          <Card key={hotel.hotel_id} style={styles.card}>
            <Card.Content>
              <Title style={styles.cardTitle}>{hotel.name}</Title>
              <Paragraph>{hotel.location}</Paragraph>
              <View style={styles.cardDetails}>
                <Chip icon="star" style={styles.chip}>
                  {hotel.rating} ★
                </Chip>
                <Chip icon="currency-inr" style={styles.chip}>
                  ₹{hotel.price_per_night?.toLocaleString()}/night
                </Chip>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button
                onPress={() => {
                  try {
                    navigation.navigate('HotelDetails', { hotelId: hotel.hotel_id });
                  } catch (error) {
                    console.log('Navigation error:', error);
                  }
                }}
              >
                View Details
              </Button>
            </Card.Actions>
          </Card>
        ))}
        <Button
          mode="text"
          onPress={() => {}}
          style={styles.viewAllButton}
        >
          View All Hotels
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 20,
    backgroundColor: '#2196F3',
  },
  welcomeTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  welcomeSubtitle: {
    color: 'white',
    opacity: 0.9,
  },
  quickActions: {
    flexDirection: 'row',
    padding: 20,
    gap: 10,
  },
  actionButton: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    marginBottom: 16,
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  cardDetails: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 8,
  },
  chip: {
    backgroundColor: '#e3f2fd',
  },
  viewAllButton: {
    marginTop: 8,
  },
});