import FetchEx from './data';
import envConfig from 'src/config/env.config';

const { authServer } = envConfig;

const getTokens = async ({ userId, role }) => {
  try {
    const resultMessage = await FetchEx( `${authServer}/tokens`, { method: 'POST', body: { userId, role } });
    return resultMessage;
  } catch ( error ) {
    throw error;
  }
};

export default { getTokens };
