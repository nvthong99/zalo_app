import React, { useState } from 'react';
import { TouchableOpacity, Modal, View, Text, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import styles from './index.style';

const Report = ({ postId, handleCloseRBSheet }) => {
  const [reportText, setReportText] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const handleReport = async () => {
    if (!reportText.trim()) {
      alert('Bạn chưa nhập lý do');
      return;
    }
    const { data } = await apis.post.reportPost(postId, reportText);
    if (data && data.status) {
      setReportText('');
      setOpenModal(false);
      handleCloseRBSheet();
      Alert.alert('Báo cáo nội dung thành công');
    }
  };

  const handleCancelReport = () => {
    setReportText('');
    setOpenModal(false);
    handleCloseRBSheet();
  };
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setOpenModal(true);
        }}
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
        }}
      >
        <Ionicons
          name="alert-circle-outline"
          style={{ fontSize: 25, marginRight: 5, color: '#000' }}
        />
        <Text style={{ fontSize: 20, color: '#000' }}>Báo cáo bài viết</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={openModal}
        onRequestClose={() => {
          setOpenModal((prev) => !prev);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Lý do</Text>
            <View>
              <TextInput
                style={styles.input}
                multiline
                numberOfLines={5}
                placeholder="Nhập lý do báo xấu"
                value={reportText}
                onChangeText={(text) => {
                  setReportText(text);
                }}
              />
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: 20,
                borderTopWidth: 1,
                borderTopColor: '#ccc',
                padding: 10,
                justifyContent: 'flex-end',
              }}
            >
              <TouchableOpacity
                style={{ marginRight: 20 }}
                onPress={handleCancelReport}
              >
                <Text style={{ fontSize: 18, color: '#ccc' }}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleReport}>
                <Text style={{ color: 'blue', fontSize: 18 }}>Gửi</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};
export default Report;
