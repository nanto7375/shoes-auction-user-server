import ExceptionAttribute from './attribute.exception';

// 400
export const badRequest = new ExceptionAttribute( 400, 10000, 'Bad request' );
export const badData = new ExceptionAttribute( 400, 10001, 'Invalid data' ); 
export const needUserUuid = new ExceptionAttribute( 400, 10005, 'Need userUuid' ); 
export const upsertFail = new ExceptionAttribute( 400, 10006, 'Upsert fail' );
export const updateFail = new ExceptionAttribute( 400, 10007, 'Update fail' );
export const createFail = new ExceptionAttribute( 400, 10008, 'Create fail' );
export const deleteFail = new ExceptionAttribute( 400, 10009, 'Delete fail' );
export const alreadyRegisterd = new ExceptionAttribute( 400, 10010, 'Already registerd' );

export const notFoundData = new ExceptionAttribute( 400, 10050, 'Empty Data' );

// 401
export const unAuthorized = new ExceptionAttribute( 401, 10100, 'Have no authorization' );
export const unAuthorizedToken = new ExceptionAttribute( 400, 10101, 'Unauthorized Token' );

// 404
export const notFoundRoute = new ExceptionAttribute( 404, 10400, 'Not found route' );

// 500
export const ServerErrorForLogout = new ExceptionAttribute( 500, 15001, 'Server Error' );
