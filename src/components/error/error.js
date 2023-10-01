import { Alert } from 'antd';
import './error.css';

function ErrorIndicator({ errorMessage }) {
  return (
    <Alert
      message="Sorry, but the page you requested does not exist or cannot be found."
      description={errorMessage}
      type="error"
      className="alert-error"
    />
  );
}

export default ErrorIndicator;
