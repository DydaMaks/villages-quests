// packages/mobile/src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { COMMON_STYLES, COLORS } from '../utils/styles';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Помилка', 'Будь ласка, заповніть всі поля');
      return;
    }

    setLoading(true);
    try {
      const success = await login(email, password);
      
      if (success) {
        // Навігація відбувається автоматично через зміну стану в AuthContext
      } else {
        Alert.alert('Помилка', 'Невірний email або пароль');
      }
    } catch (error: any) {
      Alert.alert('Помилка', error.response?.data?.message || 'Не вдалося увійти');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>🏞️ Villages Quests</Text>
          <Text style={styles.subtitle}>Вхід до системи</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={[COMMON_STYLES.input, styles.input]}
            placeholder="Email"
            placeholderTextColor={COLORS.textLight}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
          
          <TextInput
            style={[COMMON_STYLES.input, styles.input]}
            placeholder="Пароль"
            placeholderTextColor={COLORS.textLight}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete="password"
          />
          
          <TouchableOpacity
            style={[COMMON_STYLES.button, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={COMMON_STYLES.buttonText}>
              {loading ? 'Вхід...' : 'Увійти'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.linkText}>
              Немає акаунту? Зареєструватися
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Тестові акаунти:{'\n'}
            • user@example.com / password123{'\n'}
            • organizer@example.com / password123
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  input: {
    marginBottom: 16,
  },
  buttonDisabled: {
    backgroundColor: COLORS.primaryLight,
  },
  linkButton: {
    alignItems: 'center',
    marginTop: 20,
    padding: 10,
  },
  linkText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#f0fdf4',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  footerText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
});

export default LoginScreen;