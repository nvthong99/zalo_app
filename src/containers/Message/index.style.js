import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  comment: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingLeft: 15,
  },
  commenterAvatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 20,
  },
  commentContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  commenterName: {
    fontSize: 20,
    color: '#000',
    marginRight: 10,
  },
  msg: {
    fontSize: 15,
    color: '#ccc',
    marginRight: 10,
  },
});
