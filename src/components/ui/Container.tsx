import React from 'react';
import { View, StyleSheet, ViewProps, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ContainerProps extends ViewProps {
    dismissKeyboard?: boolean;
}

export function Container({ children, style, dismissKeyboard = false, ...props }: ContainerProps) {
    const content = (
        <SafeAreaView style={[styles.container, style]} {...props}>
            {children}
        </SafeAreaView>
    );

    if (dismissKeyboard) {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                {content}
            </TouchableWithoutFeedback>
        );
    }

    return content;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});
