import ErrorException from './form.exception';

// 400
export const badRequest = new ErrorException( 400, 80000, 'Bad request' );
export const badData = new ErrorException( 400, 80001, 'Invalid data' ); 
export const needUserUuid = new ErrorException( 400, 80005, 'Need userUuid' ); 
export const upsertFail = new ErrorException( 400, 80006, 'Upsert fail' );
export const updateFail = new ErrorException( 400, 80007, 'Update fail' );
export const createFail = new ErrorException( 400, 80008, 'Create fail' );
export const deleteFail = new ErrorException( 400, 80009, 'Delete fail' );
export const notFoundData = new ErrorException( 400, 80100, 'Empty Data' );

// 401
export const unAuthorized = new ErrorException( 401, 80100, 'Have no authorization' );
export const unAuthorizedToken = new ErrorException( 400, 80101, 'Unauthorized Token' );

// 404
export const notFoundRoute = new ErrorException( 404, 80400, 'Not found route' );

// 500
export const ServerErrorForLogout = new ErrorException( 500, 85001, 'Server Error' );
