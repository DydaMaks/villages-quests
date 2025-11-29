import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

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

interface QuestCardProps {
  quest: Quest;
  onPress?: () => void;
  showOrderButton?: boolean;
}

export const QuestCard: React.FC<QuestCardProps> = ({ 
  quest, 
  onPress,
  showOrderButton = true 
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '#22c55e';
      case 'medium': return '#f59e0b';
      case 'hard': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Легко';
      case 'medium': return 'Середньо';
      case 'hard': return 'Складно';
      default: return difficulty;
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: quest.images[0]?.url || 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop' }}
        style={styles.image}
        resizeMode="cover"
      />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={2}>{quest.title}</Text>
          <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(quest.difficulty) }]}>
            <Text style={styles.difficultyText}>
              {getDifficultyText(quest.difficulty)}
            </Text>
          </View>
        </View>

        <Text style={styles.description} numberOfLines={3}>
          {quest.description}
        </Text>

        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>📍</Text>
            <Text style={styles.detailText}>{quest.location}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>⏱</Text>
            <Text style={styles.detailText}>{quest.duration} хв</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>👥</Text>
            <Text style={styles.detailText}>до {quest.maxParticipants} ос.</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>⭐</Text>
            <Text style={styles.detailText}>{quest.rating.average} ({quest.rating.count})</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.price}>
            {quest.price > 0 ? `${quest.price} грн` : 'Безкоштовно'}
          </Text>
          
          {showOrderButton && (
            <TouchableOpacity style={styles.orderButton}>
              <Text style={styles.orderButtonText}>Замовити</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
    marginRight: 8,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 70,
    alignItems: 'center',
  },
  difficultyText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
    lineHeight: 20,
  },
  details: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailIcon: {
    fontSize: 14,
    marginRight: 6,
    width: 20,
  },
  detailText: {
    fontSize: 14,
    color: '#6b7280',
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#22c55e',
  },
  orderButton: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  orderButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});