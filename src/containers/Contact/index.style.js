import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  comment: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    marginBottom: 10,
  },
  commenterAvatar: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginRight: 10,
  },
  commentContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  commenterName: {
    fontSize: 15,
    color: '#000',
    marginRight: 10,
  },
});
