// import Mq from 'amqplib/callback_api';
// import logger from '../config/log.config';
// import envConfig from '../config/env.config';

// const { mqServerAddress, mqServerQueueName } = envConfig;

// export const mqSender = async ({ payload }) => {
//   Mq.connect( mqServerAddress, async function( error, connection ){
//     if( error ){
//       logger.error({ error });
//       return;
//     }
//     connection.createChannel( async function( error, channel ){
//       if( error ){
//         logger.error({ error });
//         return;
//       }
//       logger.info({ mq: mqServerAddress, channel: mqServerQueueName, payload: payload });
      
//       const result = await channel.sendToQueue( mqServerQueueName, Buffer.from( JSON.stringify( payload ) ), { persistent: true });
//       logger.info({ mqResult: result });
//     });
//     setTimeout( function() {
//       connection.close();
//     }, 500 );
//   });
// };

// export const sendMqByType = async ( type, body ) => {
//   const pushType = {
//     'ORDER_PHASE_CHANGE': () => {
//       const { phase, userUuid, cookingTime, cancelInfo, orderUuid, cafeteriaName } = body;
//       const phaseFirstFigure = phase.substring( 0, 1 );
//       const phaseRestFigure = phase.substring( 1 ).toLowerCase();
//       const result = {
//         type: `${phase === 'COMPLETED' ? 'cooking' : 'order'}${phaseFirstFigure}${phaseRestFigure}`,
//         targetUuid: userUuid,
//         orderUuid,
//         cookingTime,
//         cancelInfo,
//         cafeteriaName,
//       };
//       if ( !cookingTime ) delete result.cookingTime;
//       if ( !cancelInfo ) delete result.cancelInfo;

//       return result;
//     },
//     'NEW_ORDER': () => ({ 
//       type: 'newOrder', 
//       targetUuid: body.cafeteriaUuid,
//     }),
//     'CANCEL_ORDER': () => ({ 
//       type: 'orderCanceledNotByAdmin',
//       targetUuid: body.cafeteriaUuid,
//       message: body.message, 
//     }),
//   };

//   const payload = pushType[type]();
//   await mqSender({ payload });
// };

