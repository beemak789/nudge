import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Modal } from '../services/Modal';
import { Button } from '../services/Button';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { logOutUser } from '../store/user';

const LogOut = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const dispatch = useDispatch();
  const onSubmit = () => {
    dispatch(logOutUser());
  };

  const cancel = () => {
    setIsModalVisible(false);
    props.navigation.goBack('Screens 3', {
      screen: 'Screen 3',
    });
  };

  onDismiss = () => {
    setIsModalVisible(true);
  };

  useFocusEffect(() => {
    setIsModalVisible(true);
  });

  return (
    <View style={styles.container}>
      <Modal isVisible={isModalVisible} onDismiss={onDismiss}>
        <Modal.Container>
          <Modal.Header title="Are you sure you would like to log out?" />
          <Modal.Body>
            <Text style={styles.text}>
              This app functions best when you remain logged in
            </Text>
          </Modal.Body>
          <Modal.Footer>
            <Button title="Log Out" onPress={onSubmit} />
            <Button title="Cancel" onPress={cancel} />
          </Modal.Footer>
        </Modal.Container>
      </Modal>
    </View>
  );
};

export default LogOut;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },

  text: {
    fontSize: 18,
  },
});
