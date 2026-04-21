import { Redirect } from 'expo-router';
import { useAppStore } from '@/store/useAppStore';

export default function Index() {
    const hasFinishedOnboarding = useAppStore(state => state.hasFinishedOnboarding);

    if (hasFinishedOnboarding) {
        return <Redirect href="/home" />;
    }

    return <Redirect href="/onboarding/welcome" />;
}
