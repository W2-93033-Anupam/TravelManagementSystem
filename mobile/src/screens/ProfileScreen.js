import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {
  Card,
  TextInput,
  Button,
  Title,
  Divider,
  List,
  Avatar,
} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/apiService';

const ProfileScreen = ({ navigation }) => {
  const { user, updateUser, logout } = useAuth();
  const [profileData, setProfileData] = useState({
    full_name: '',
    email: '',
    phone: '',
    address: '',
    date_of_birth: '',
    id_type: '',
    id_number: '',
  });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const navigateToTab = (tabName) => {
    const parentNavigation = navigation.getParent();
    if (parentNavigation) {
      parentNavigation.navigate(tabName);
    }
  };

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      const response = await apiService.getProfile();
      if (response.success) {
        const profile = response.data;
        setProfileData({
          full_name: profile.full_name || '',
          email: profile.email || '',
          phone: profile.phone || '',
          address: profile.address || '',
          date_of_birth: profile.date_of_birth || '',
          id_type: profile.id_type || '',
          id_number: profile.id_number || '',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to load profile',
      });
    }
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      const response = await apiService.updateProfile(profileData);
      if (response.success) {
        updateUser(response.data);
        setEditing(false);
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Profile updated successfully',
        });
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
        text2: 'Failed to update profile',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
            Toast.show({
              type: 'success',
              text1: 'Success',
              text2: 'Logged out successfully',
            });
            navigation.replace('Login');
          },
        },
      ]
    );
  };

  if (!user) {
    return (
      <View style={styles.centered}>
        <Text style={styles.message}>Please login to view your profile</Text>
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

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <Card style={styles.headerCard}>
        <Card.Content style={styles.headerContent}>
          <Avatar.Text
            size={80}
            label={user.full_name?.charAt(0) || 'U'}
            style={styles.avatar}
          />
          <View style={styles.headerInfo}>
            <Title style={styles.userName}>{user.full_name}</Title>
            <Text style={styles.userEmail}>{user.email}</Text>
          </View>
        </Card.Content>
      </Card>

      {/* Profile Form */}
      <Card style={styles.formCard}>
        <Card.Content>
          <View style={styles.formHeader}>
            <Title style={styles.formTitle}>Personal Information</Title>
            <Button
              mode={editing ? 'outlined' : 'contained'}
              onPress={() => setEditing(!editing)}
              compact
            >
              {editing ? 'Cancel' : 'Edit'}
            </Button>
          </View>

          <TextInput
            label="Full Name"
            value={profileData.full_name}
            onChangeText={(value) => handleInputChange('full_name', value)}
            mode="outlined"
            disabled={!editing}
            style={styles.input}
          />

          <TextInput
            label="Email"
            value={profileData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            mode="outlined"
            keyboardType="email-address"
            disabled={!editing}
            style={styles.input}
          />

          <TextInput
            label="Phone"
            value={profileData.phone}
            onChangeText={(value) => handleInputChange('phone', value)}
            mode="outlined"
            keyboardType="phone-pad"
            disabled={!editing}
            style={styles.input}
          />

          <TextInput
            label="Address"
            value={profileData.address}
            onChangeText={(value) => handleInputChange('address', value)}
            mode="outlined"
            multiline
            numberOfLines={3}
            disabled={!editing}
            style={styles.input}
          />

          <TextInput
            label="Date of Birth (YYYY-MM-DD)"
            value={profileData.date_of_birth}
            onChangeText={(value) => handleInputChange('date_of_birth', value)}
            mode="outlined"
            placeholder="1990-01-01"
            disabled={!editing}
            style={styles.input}
          />

          <TextInput
            label="ID Type"
            value={profileData.id_type}
            onChangeText={(value) => handleInputChange('id_type', value)}
            mode="outlined"
            placeholder="Passport, Aadhar, etc."
            disabled={!editing}
            style={styles.input}
          />

          <TextInput
            label="ID Number"
            value={profileData.id_number}
            onChangeText={(value) => handleInputChange('id_number', value)}
            mode="outlined"
            disabled={!editing}
            style={styles.input}
          />

          {editing && (
            <Button
              mode="contained"
              onPress={handleSaveProfile}
              loading={loading}
              disabled={loading}
              style={styles.saveButton}
            >
              Save Changes
            </Button>
          )}
        </Card.Content>
      </Card>

      {/* Quick Actions */}
      <Card style={styles.actionsCard}>
        <Card.Content>
          <Title style={styles.actionsTitle}>Quick Actions</Title>
          
          <List.Item
            title="My Bookings"
            description="View and manage your bookings"
            left={props => <List.Icon {...props} icon="bookmark" />}
            onPress={() => navigation.navigate('Bookings')}
            style={styles.listItem}
          />
          
          <Divider />
          
          <List.Item
            title="Browse Packages"
            description="Explore travel packages"
            left={props => <List.Icon {...props} icon="card-travel" />}
            onPress={() => {}}
            style={styles.listItem}
          />
          
          <Divider />
          
          <List.Item
            title="Find Hotels"
            description="Search and book hotels"
            left={props => <List.Icon {...props} icon="hotel" />}
            onPress={() => {}}
            style={styles.listItem}
          />
          
          <Divider />
          
          <List.Item
            title="Logout"
            description="Sign out of your account"
            left={props => <List.Icon {...props} icon="logout" />}
            onPress={handleLogout}
            style={styles.listItem}
          />
        </Card.Content>
      </Card>
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
  headerCard: {
    margin: 16,
    elevation: 3,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: '#2196F3',
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
  },
  formCard: {
    margin: 16,
    marginTop: 0,
  },
  formHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  formTitle: {
    fontSize: 20,
  },
  input: {
    marginBottom: 12,
  },
  saveButton: {
    marginTop: 16,
  },
  actionsCard: {
    margin: 16,
    marginTop: 0,
    marginBottom: 32,
  },
  actionsTitle: {
    fontSize: 20,
    marginBottom: 8,
  },
  listItem: {
    paddingVertical: 8,
  },
});

export default ProfileScreen;