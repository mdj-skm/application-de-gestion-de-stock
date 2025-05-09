import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  // Barre latérale
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
    backgroundColor: '#fff',
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
    borderRadius: 15,
  },
  menuText: {
    fontWeight: 'bold',
    color: '#000',
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

  // Zone principale
  mainContent: {
    flex: 1,
    backgroundColor: '#fff3cf',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#f4c7a1',
    padding: 10,
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
    color: '#000',
  },
  moduleTitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  clientBox: {
    backgroundColor: '#f28b4b',
    padding: 20,
    alignItems: 'center',
    borderRadius: 10,
  },
  boxLogo: {
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  clientTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  clientDesc: {
    fontSize: 14,
    color: '#000',
  },
});
