import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import RNModal from 'react-native-modal';

export const OptionsModal = ({
  isVisible = true,
  onDismiss,
  children,
  ...props
}) => {
  return (
    <RNModal
      isVisible={isVisible}
      onDismiss={onDismiss}
      animationInTiming={800}
      animationOutTiming={800}
      backdropTransitionInTiming={800}
      backdropTransitionOutTiming={800}
      {...props}
    >
      {children}
    </RNModal>
  );
};

const ModalContainer = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

const ModalHeader = ({ title }) => (
  <View style={styles.header}>
    <Text style={styles.text}>{title}</Text>
  </View>
);

const ModalBody = ({ children }) => <View style={styles.body}>{children}</View>;

const ModalFooter = ({ children }) => (
  <View style={styles.footer}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    paddingTop: 10,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 24,
  },
  body: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    minHeight: 100,
    fontSize: 24,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    flexDirection: 'column',
  },
});

OptionsModal.Header = ModalHeader;
OptionsModal.Container = ModalContainer;
OptionsModal.Body = ModalBody;
OptionsModal.Footer = ModalFooter;
