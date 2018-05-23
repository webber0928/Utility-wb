const _ = require('lodash');
exports.request = require('supertest')('http://localhost:6161');
// exports.request = require('supertest')('https://rd-rdsg-openapi.auto.mydlink.com');

exports.ssmlToText = (ssml) => {
  if(!ssml) return '';
  return ssml.replace( /(<([^>]+)>)/ig, '');
};

exports.setActionIntent = (data, intent) => {
  let intentList = intent.split('-');
  let actionIntent = intentList.length > 1 ? `${intentList[0]}.${intent}` : null;
  if (actionIntent) data.queryResult.action = actionIntent;
  return data;
};

exports.setIntent = (data, intent) => {
  let checkData = data.queryResult.intent.displayName;
  // let checkData = _.get(data, 'queryResult.intent.displayName', null);
  if (checkData)
    data.queryResult.intent.displayName = intent
  return data;
};

exports.setTalk = (data, talk) => {
  data.queryResult.queryText =
  data.originalDetectIntentRequest.payload.inputs[0].rawInputs[0].query = talk;
  if ( data.originalDetectIntentRequest.payload.inputs[0].arguments) {
    data.originalDetectIntentRequest.payload.inputs[0].arguments[0].textValue = talk;
    data.originalDetectIntentRequest.payload.inputs[0].arguments[0].rawText = talk;
  }
  return data;
};


exports.initSend = (data, parameters) => {
  let token = 'uUFtGHU10AP2MJ5ji2uAWKa(rd-rdsg)';
  let user = _.get(data, 'originalDetectIntentRequest.payload.user', null);
  if (!user) return null;
  // 處理token
  user.accessToken = token;

  // ?? userStorage 先暫時刪掉
  if (user.userStorage) delete user.userStorage;
  data.originalDetectIntentRequest.payload.user = user;

  // 處理 parameters DeviceName
  if (parameters && parameters.DeviceName) {
    data.queryResult.parameters.DeviceName = parameters.DeviceName;
    let outputContexts = _.get(data, 'queryResult.outputContexts', []);
    _.forEach(outputContexts, (agent, index) => {
      outputContexts[index].parameters = {
        "DeviceName.original": parameters.DeviceName,
        "DeviceName": parameters.DeviceName
      };
    });
    data.queryResult.outputContexts = outputContexts;
  }

  // 處理 parameters data
  if (parameters && parameters.data) {
    let outputContexts = _.get(data, 'queryResult.outputContexts', []);
    _.forEach(outputContexts, (agent, index) => {
      if (agent.name.includes('_actions_on_google')) {
        outputContexts[index].parameters.data = parameters.data;
      }
    });
    data.queryResult.outputContexts = outputContexts;
  }

  return data;
}
