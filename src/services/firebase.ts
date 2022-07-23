import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAh-tV-H0TbqxVHCSqMPdBLwQivTl_1u5I',
  authDomain: 'gb-react-ca669.firebaseapp.com',
  projectId: 'gb-react-ca669',
  storageBucket: 'gb-react-ca669.appspot.com',
  messagingSenderId: '414948860769',
  appId: '1:414948860769:web:184056e3963ddbfdd25b20',
};

export const app = initializeApp(firebaseConfig);

export const realtimeDatabase = getDatabase(app);
