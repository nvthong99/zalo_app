import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  boxFeel: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 20,
  },
  headerPost: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  headerAvatarAuthor: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 20,
  },
  actionPostContainer: {
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionPost: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  reactPost: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 30,
  },
  commentIcon: {
    fontSize: 25,
    color: '#ccc',
    marginRight: 5,
  },
});
