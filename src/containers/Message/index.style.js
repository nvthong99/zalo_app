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
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 10,
  },
});
