import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    width: 50,
    height: 20,
    alignItems: 'center',
    backgroundColor: '#841584',
    marginVertical: 10,
  },
  getUserBtn: {
    width: 100,
    height: 50,
    alignItems: 'center',
    backgroundColor: 'cyan',
    marginVertical: 10,
  },
  progress: {
    height: 1,
    width: '90%',
    marginTop: 10,
    flexDirection: 'row',
  },
});
