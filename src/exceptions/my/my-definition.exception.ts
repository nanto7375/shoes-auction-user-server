import ExceptionAttribute from './my-attribute.exception';

// 400
export const badRequest = new ExceptionAttribute( 400, 80000, 'Bad request' );
export const badData = new ExceptionAttribute( 400, 80001, 'Invalid data' ); 
export const needUserUuid = new ExceptionAttribute( 400, 80005, 'Need userUuid' ); 
export const upsertFail = new ExceptionAttribute( 400, 80006, 'Upsert fail' );
export const updateFail = new ExceptionAttribute( 400, 80007, 'Update fail' );
export const createFail = new ExceptionAttribute( 400, 80008, 'Create fail' );
export const deleteFail = new ExceptionAttribute( 400, 80009, 'Delete fail' );
export const noStoreStaff = new ExceptionAttribute( 400, 80010, 'No store`s staff' );
export const alreadyRegistered = new ExceptionAttribute( 400, 80011, 'Already Registered' );
export const registeredStaff = new ExceptionAttribute( 400, 80012, 'Registered staff' );
export const closedStore = new ExceptionAttribute( 400, 80013, 'Closed Store' );
export const failForBusinessRegistration = new ExceptionAttribute( 400, 80014, 'Fail for business registration' );
export const duplicateLocation = new ExceptionAttribute( 400, 80015, 'Duplicate Location' );
export const noRequiredChecked = new ExceptionAttribute( 400, 80016, 'Required value not checked' );
export const notFoundData = new ExceptionAttribute( 400, 80100, 'Empty Data' );
export const stoppedMenu = new ExceptionAttribute( 400, 80031, 'Stopped Menu' );
export const closedCafeteria = new ExceptionAttribute( 400, 80032, 'Closed Cafeteria' );
export const contentChanged = new ExceptionAttribute( 400, 80033, 'Content Changed' );
export const deliveryUnavailable = new ExceptionAttribute( 400, 80034, 'Delivery Unavailable' );

// 401
export const unAuthorized = new ExceptionAttribute( 401, 80100, 'Have no authorization' );
export const unAuthorizedToken = new ExceptionAttribute( 400, 80101, 'Unauthorized Token' );
export const noStoreMember = new ExceptionAttribute( 400, 80102, 'Not a staff member of the store' );
export const noStoreOwner = new ExceptionAttribute( 401, 80103, 'Not a owner of the store' );
export const noCafeteriaMember = new ExceptionAttribute( 401, 80104, 'Not a Cafeteria member' );

// 404
export const notFoundRoute = new ExceptionAttribute( 404, 80400, 'Not found route' );

// 500
export const ServerErrorForLogout = new ExceptionAttribute( 500, 85001, 'Server Error' );
