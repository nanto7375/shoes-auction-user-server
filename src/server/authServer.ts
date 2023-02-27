import FetchEx from './data';
import envConfig from '../config/env.config';

const { authServer } = envConfig;

const getTokens = async ({ userUuid, role }) => {
  try {
    const resultMessage = await FetchEx( `${authServer}/tokens`, { method: 'POST', body: { userUuid, role } });
    return resultMessage;
  } catch ( error ) {
    throw error;
  }
};

export default { getTokens };
