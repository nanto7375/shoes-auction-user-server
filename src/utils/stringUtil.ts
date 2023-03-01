export const removeBlank = ( str = '' ): string => str.replace( / /g, "" );

export const isEmail = ( email: string ): boolean => {
  const regexEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  return !!email.match( regexEmail ); 
};

export const makeTempPassword = () => Array( 10 ).fill( null ).map( () => Math.round( Math.random() * 10 ) ).join( '' );
