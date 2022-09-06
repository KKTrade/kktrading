import Alert from 'react-bootstrap/Alert';

export default function MessageBox(props) {
  return <Alert style={{fontWeight:'bold'}} variant={props.variant || 'info'}>{props.children}</Alert>;
}
