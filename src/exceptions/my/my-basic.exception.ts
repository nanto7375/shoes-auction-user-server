class MyBasicException extends Error {
  status:number;

  resultCode: number;

  resultMessage: string;

  constructor( status:number, resultCode:number, message:string ) {
    super( message );
    this.status = status;
    this.resultCode = resultCode;
    this.resultMessage = message;
  }
}

export default MyBasicException;
