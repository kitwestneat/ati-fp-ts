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

export default StyleSheet.create({
  card,
  modalCard,
  centerItems,
  formRow,
  label,
  input,
  adminTextInput
} as any); // use WebViewStyle to check types
