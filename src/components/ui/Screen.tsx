import { View } from 'react-native';

export const Screen = ({ children }: { children: React.ReactNode }) => (
    <View className="flex-1 bg-white dark:bg-gray-950">
        {children}
    </View>
);
