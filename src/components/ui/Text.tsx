import React from 'react';
import { Text as RNText, StyleSheet, TextProps } from 'react-native';

interface CustomTextProps extends TextProps {
    variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
}

export function Text({ variant = 'body', style, ...props }: CustomTextProps) {
    const getVariantStyle = () => {
        switch (variant) {
            case 'h1': return styles.h1;
            case 'h2': return styles.h2;
            case 'h3': return styles.h3;
            case 'caption': return styles.caption;
            default: return styles.body;
        }
    };

    return (
        <RNText style={[styles.base, getVariantStyle(), style]} {...props} />
    );
}

const styles = StyleSheet.create({
    base: {
        color: '#1F2937',
    },
    h1: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    h2: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    h3: {
        fontSize: 20,
        fontWeight: '600',
    },
    body: {
        fontSize: 16,
    },
    caption: {
        fontSize: 14,
        color: '#6B7280',
    },
});
