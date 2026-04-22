import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import CategoryScreen from '../screens/CategoryScreen';
import LessonScreen from '../screens/LessonScreen';
import QuizScreen from '../screens/QuizScreen';
import ProgressScreen from '../screens/ProgressScreen';
import { colors } from '../theme';

export type RootStackParamList = {
  Home: undefined;
  Category: { categoryId: string };
  Lesson: { categoryId: string };
  Quiz: { categoryId?: string };
  Progress: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '700' },
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Lerne Deutsch' }} />
      <Stack.Screen name="Category" component={CategoryScreen} options={{ title: 'Category' }} />
      <Stack.Screen name="Lesson" component={LessonScreen} options={{ title: 'Lesson' }} />
      <Stack.Screen name="Quiz" component={QuizScreen} options={{ title: 'Quiz' }} />
      <Stack.Screen name="Progress" component={ProgressScreen} options={{ title: 'My Progress' }} />
    </Stack.Navigator>
  );
}
