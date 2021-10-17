import React, { useState } from 'react';
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Modal,
} from 'react-native';

const ModalBadge = (props) => {
  const { tasks } = useSelector((state) => state.task);
  const completeTasks = tasks.filter((task) => task.completed === true);
  const [modalOpen, setModalOpen] = useState(false);

  console.log('all of my tasks***----->', tasks); //water juice bread
  console.log('the completed tasks**---->', completeTasks); //water and juice

  if (tasks.length === completeTasks.length) {
    setModalOpen(true);
  } else {
    setModalOpen(false);
  }

  return <SafeAreaView>
    <Modal
    visible={modalOpen}
    >

    </Modal>


  </SafeAreaView>;
};

export default ModalBadge;
