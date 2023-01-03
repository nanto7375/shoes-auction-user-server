import ExceptionAttribute from './my/my-attribute.exception';
import MyBasicException from './my/my-basic.exception';

class ErrorException extends MyBasicException {
  constructor( errorAttribute:ExceptionAttribute, message?:string ) {
    super(
      errorAttribute.getStatus,
      errorAttribute.getResultCode,
      message || errorAttribute.getResultMessage
    );
  }
}

export default ErrorException;
