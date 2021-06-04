import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  content: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
  },
  headerContent: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sendBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
    padding: 10,
  },
  commenterName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 10,
  },
});
