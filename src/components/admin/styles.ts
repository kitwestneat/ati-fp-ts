import { StyleSheet, TextStyle } from 'react-native';
import { WebViewStyle } from '../../types';

const card: WebViewStyle = {
  padding: '1rem',
  borderRadius: 2,
  height: '300',
  margin: '1rem',
  position: 'relative',
  width: 600,
  boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  flexDirection: 'column',
  backgroundColor: 'white'
};

const modalCard: WebViewStyle = {
  ...card,
  width: 700,
  backgroundColor: 'white',
  marginTop: '15vh',
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: '#666'
};

const centerItems: WebViewStyle = {
  justifyContent: 'center',
  alignItems: 'center'
};

const formRow: WebViewStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  flexDirection: 'row',
  width: '80%'
};

const label: TextStyle = {
  fontWeight: 'bold',
  marginRight: '1rem',
  flex: 1
};

const input: WebViewStyle = {
  flex: 1,
  marginTop: 3,
  marginBottom: 3
};

const adminTextInput: WebViewStyle = {
  borderColor: '#CCC',
  borderWidth: 1,
  borderStyle: 'solid',
  padding: 4
};

const savingAlert: WebViewStyle = {
  height: 56,
  width: 125,
  bottom: 20,
  left: 0,
  right: 0,
  marginLeft: 'auto',
  marginRight: 'auto',
  position: 'fixed' as any, // Not supported in real react native
  backgroundColor: '#F0FFE6',
  borderColor: '#708064',
  borderWidth: 1,
  alignItems: 'center',
  justifyContent: 'center'
};

const headline: TextStyle = {
  fontWeight: 'bold',
  fontSize: 18
};

export default StyleSheet.create({
  card,
  modalCard,
  centerItems,
  formRow,
  label,
  input,
  adminTextInput,
  savingAlert,
  headline
} as any); // Use WebViewStyle to check types
