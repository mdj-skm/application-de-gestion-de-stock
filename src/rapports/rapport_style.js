import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },

  sidebar: {
    width: '25%',
    backgroundColor: '#e67228',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  profileSection: {
    alignItems: 'center',
    marginTop: 30,
  },

  profileIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#000',
    marginBottom: 10,
  },

  username: {
    fontWeight: 'bold',
    color: '#000',
  },

  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
    marginTop: 5,
  },

  menuButton: {
    backgroundColor: '#f8a35e',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },

  menuText: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 16,
  },

  logoutButton: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },

  logoutText: {
    color: '#000',
  },

  mainContent: {
    flex: 1,
    backgroundColor: '#fff3cf',
    padding: 20,
    alignItems: 'center',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },

  logoContainer: {
    backgroundColor: '#000',
    padding: 10,
    marginRight: 10,
  },

  logoText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  companyName: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  moduleText: {
    fontSize: 18,
    marginBottom: 20,
  },

  moduleBox: {
    backgroundColor: '#f28b4b',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },

  boxLogo: {
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#000',
  },

  moduleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },

  moduleDesc: {
    fontSize: 14,
    color: '#000',
  },
});

