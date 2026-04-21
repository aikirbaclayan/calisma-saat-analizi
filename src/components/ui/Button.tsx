import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    style?: ViewStyle;
}

export function Button({
    title,
    onPress,
    variant = 'primary',
    size = 'md',
    disabled = false,
    style
}: ButtonProps) {
    const getVariantStyle = () => {
        switch (variant) {
            case 'secondary': return styles.secondary;
            case 'ghost': return styles.ghost;
            default: return styles.primary;
        }
    };

    const getTextStyle = () => {
        switch (variant) {
            case 'secondary': return styles.secondaryText;
            case 'ghost': return styles.ghostText;
            default: return styles.primaryText;
        }
    };

    const getSizeStyle = () => {
        switch (size) {
            case 'sm': return styles.sm;
            case 'lg': return styles.lg;
            default: return styles.md;
        }
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={[
                styles.base,
                getVariantStyle(),
                getSizeStyle(),
                disabled && styles.disabled,
                style,
            ]}
        >
            <Text style={[styles.text, getTextStyle(), disabled && styles.disabledText]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    base: {
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    primary: {
        backgroundColor: '#3B82F6',
    },
    secondary: {
        backgroundColor: '#F3F4F6',
    },
    ghost: {
        backgroundColor: 'transparent',
    },
    sm: {
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    md: {
        paddingVertical: 16,
        paddingHorizontal: 24,
    },
    lg: {
        paddingVertical: 20,
        paddingHorizontal: 32,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    primaryText: {
        color: '#FFFFFF',
    },
    secondaryText: {
        color: '#1F2937',
    },
    ghostText: {
        color: '#3B82F6',
    },
    disabled: {
        opacity: 0.5,
    },
    disabledText: {
        opacity: 0.7,
    },
});
