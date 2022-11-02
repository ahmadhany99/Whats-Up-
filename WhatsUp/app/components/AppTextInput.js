import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import colors from '../config/colors';

function AppTextInput({ style, ...props }) {
  return (
    <View style={[styles.container, style]}>
      <TextInput style={styles.text} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: colors.lightGrey,
    borderRadius: 7,
    paddingVertical: 7,
    paddingHorizontal: 12,
    width: '90%',
    alignSelf: 'center',
    marginVertical: 10,
    borderStyle: 'solid',
    borderWidth: 1,
  },
  text: {
    color: colors.lightGrey,
    fontSize: 18,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
});

export default AppTextInput;
