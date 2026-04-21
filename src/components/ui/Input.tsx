import React from 'react';
import { TextInput, StyleSheet, TextInputProps, ViewStyle } from 'react-native';
import { useAppStore } from '@/store/useAppStore';

interface InputProps extends TextInputProps {
    style?: ViewStyle;
}

export function Input({ style, ...props }: InputProps) {
    const { isDarkMode } = useAppStore();

    const dark = isDarkMode;

    return (
        <TextInput
            style={[
                styles.input,
                {
                    backgroundColor: dark ? '#374151' : '#FFFFFF',
                    color: dark ? '#F9FAFB' : '#1F2937',
                    borderColor: dark ? '#4B5563' : '#E5E7EB',
                },
                style,
            ]}
            placeholderTextColor={dark ? '#9CA3AF' : '#9CA3AF'}
            {...props}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        marginBottom: 16,
    },
});
