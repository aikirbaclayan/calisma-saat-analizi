import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAppStore } from '@/store/useAppStore';

export default function Layout() {
    const { isDarkMode } = useAppStore();

    return (
        <SafeAreaProvider>
            <StatusBar style={isDarkMode ? 'light' : 'dark'} />
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="onboarding/welcome" options={{ animation: 'fade' }} />
                <Stack.Screen name="onboarding/salary" options={{ animation: 'slide_from_right' }} />
                <Stack.Screen name="onboarding/schedule" options={{ animation: 'slide_from_right' }} />
                <Stack.Screen name="home/index" options={{ animation: 'fade' }} />
                <Stack.Screen name="settings/index" options={{ presentation: 'modal' }} />
                <Stack.Screen name="how-it-works/index" options={{ presentation: 'modal' }} />
            </Stack>
        </SafeAreaProvider>
    );
}
