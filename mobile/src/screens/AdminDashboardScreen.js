import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  Title,
  Card,
  Paragraph,
  ActivityIndicator,
  Button,
} from 'react-native-paper';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/apiService';

export default function AdminDashboardScreen({ navigation }) {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState(null);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [statsResult, agentsResult] = await Promise.all([
        apiService.getDashboardStats(),
        apiService.getAgents(),
      ]);

      if (statsResult.success) {
        setStats(statsResult.data.stats);
      }

      if (agentsResult.success) {
        setAgents(agentsResult.data.agents || []);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
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
          Welcome, {user?.name}!
        </Title>
        <Paragraph style={styles.welcomeSubtitle}>
          Admin Dashboard
        </Paragraph>
      </View>

      {stats && (
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <Card style={styles.statCard}>
              <Card.Content>
                <Title style={styles.statNumber}>{stats.agents}</Title>
                <Paragraph>Agents</Paragraph>
              </Card.Content>
            </Card>
            <Card style={styles.statCard}>
              <Card.Content>
                <Title style={styles.statNumber}>{stats.packages}</Title>
                <Paragraph>Packages</Paragraph>
              </Card.Content>
            </Card>
          </View>
          <View style={styles.statsRow}>
            <Card style={styles.statCard}>
              <Card.Content>
                <Title style={styles.statNumber}>{stats.bookings}</Title>
                <Paragraph>Bookings</Paragraph>
              </Card.Content>
            </Card>
            <Card style={styles.statCard}>
              <Card.Content>
                <Title style={styles.statNumber}>₹{stats.revenue?.toLocaleString()}</Title>
                <Paragraph>Revenue</Paragraph>
              </Card.Content>
            </Card>
          </View>
        </View>
      )}

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Recent Agents</Title>
        {agents.slice(0, 5).map((agent) => (
          <Card key={agent.agent_id} style={styles.agentCard}>
            <Card.Content>
              <Title style={styles.agentName}>{agent.name}</Title>
              <Paragraph>{agent.email}</Paragraph>
              <Paragraph>Commission: {agent.commission_rate}%</Paragraph>
              <Paragraph>Status: {agent.status}</Paragraph>
            </Card.Content>
          </Card>
        ))}
      </View>

      <View style={styles.actions}>
        <Button
          mode="contained"
          onPress={handleLogout}
          style={styles.logoutButton}
          buttonColor="#d32f2f"
        >
          Logout
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
    backgroundColor: '#d32f2f',
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
  statsContainer: {
    padding: 20,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 16,
  },
  statCard: {
    flex: 1,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d32f2f',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    marginBottom: 16,
    fontSize: 20,
    fontWeight: 'bold',
  },
  agentCard: {
    marginBottom: 12,
    elevation: 2,
  },
  agentName: {
    fontSize: 16,
    marginBottom: 4,
  },
  actions: {
    padding: 20,
  },
  logoutButton: {
    paddingVertical: 8,
  },
});