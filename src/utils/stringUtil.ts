export const removeEmptySpace = ( str = '' ) => str.replace( / /g,"" );

export const isEmail = ( email: string ) => {
  const regexEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  return email.match( regexEmail ); 
};
