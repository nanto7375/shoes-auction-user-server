export default class ExceptionAttribute {
    private status:number

    private resultCode:number

    private resultMessage:string

    constructor( status:number, resultCode:number, resultMessage:string ) {
      this.status = status;
      this.resultCode = resultCode;
      this.resultMessage = resultMessage;
    }

    get getStatus():number {
      return this.status;
    }

    get getResultCode():number {
      return this.resultCode;
    }

    get getResultMessage():string {
      return this.resultMessage;
    }
}
