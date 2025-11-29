import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { questsAPI } from '../../services/api';
import { QuestCard } from '../../components/quests/QuestCard';
import { COMMON_STYLES, COLORS, TYPOGRAPHY } from '../../utils/styles';

interface Quest {
  _id: string;
  title: string;
  description: string;
  location: string;
  difficulty: string;
  price: number;
  duration: number;
  maxParticipants: number;
  organizer: {
    _id: string;
    username: string;
  };
  images: Array<{ url: string; alt: string }>;
  rating: {
    average: number;
    count: number;
  };
}

const QuestsScreen: React.FC = () => {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    loadQuests();
  }, []);

  const loadQuests = async () => {
    try {
      setLoading(true);
      const response = await questsAPI.getAll();
      
      if (response.data.success) {
        setQuests(response.data.quests);
      } else {
        Alert.alert('Помилка', 'Не вдалося завантажити квести');
      }
    } catch (error: any) {
      console.error('Помилка завантаження квестів:', error);
      Alert.alert('Помилка', error.response?.data?.message || 'Помилка сервера');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadQuests();
  };

  const handleLogout = () => {
    Alert.alert(
      'Вихід',
      'Ви впевнені, що хочете вийти?',
      [
        { text: 'Скасувати', style: 'cancel' },
        { text: 'Вийти', onPress: logout, style: 'destructive' },
      ]
    );
  };

  const handleQuestPress = (quest: Quest) => {
  const buttons: Array<{text: string; style?: 'default' | 'cancel' | 'destructive'; onPress?: () => void}> = [
    { text: 'OK', style: 'default' },
  ];
  
  if (user?.role === 'user') {
    buttons.push({ 
      text: 'Замовити', 
      onPress: () => handleOrder(quest),
      style: 'default' 
    });
  }

  Alert.alert(
    quest.title,
    `Локація: ${quest.location}\nЦіна: ${quest.price > 0 ? `${quest.price} грн` : 'Безкоштовно'}\n\n${quest.description}`,
    buttons
  );
};
  const handleOrder = (quest: Quest) => {
    Alert.alert(
      'Замовлення',
      `Ви хочете замовити квест "${quest.title}"?`,
      [
        { text: 'Скасувати', style: 'cancel' },
        { text: 'Замовити', onPress: () => createOrder(quest) },
      ]
    );
  };

  const createOrder = async (quest: Quest) => {
    try {
      Alert.alert('Успіх', 'Замовлення створено!');
    } catch (error) {
      Alert.alert('Помилка', 'Не вдалося створити замовлення');
    }
  };

  if (loading && !refreshing) {
    return (
      <View style={COMMON_STYLES.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={{ marginTop: 12, color: COLORS.textSecondary }}>
          Завантаження квестів...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>
            Вітаємо, {user?.username}! 👋
          </Text>
          <Text style={styles.roleText}>
            {user?.role === 'organizer' ? 'Організатор' : 'Користувач'}
          </Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Вийти</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={quests}
        renderItem={({ item }) => (
          <QuestCard 
            quest={item} 
            onPress={() => handleQuestPress(item)}
            showOrderButton={user?.role === 'user'}
          />
        )}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>Квестів поки що немає</Text>
            <Text style={styles.emptyText}>
              {user?.role === 'organizer' 
                ? 'Створіть перший квест!' 
                : 'Очікуйте на нові квести'
              }
            </Text>
          </View>
        }
        ListHeaderComponent={
          quests.length > 0 ? (
            <Text style={styles.listTitle}>
              {user?.role === 'organizer' ? 'Мої квести' : 'Доступні квести'}
            </Text>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 10,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  roleText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  logoutButton: {
    backgroundColor: COLORS.error,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  listContent: {
    paddingBottom: 20,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textSecondary,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default QuestsScreen;