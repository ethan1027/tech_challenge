/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
const axios = require('axios');
const { graphql, buildSchema } = require('graphql')

let url = 'https://iheart-challenge-songs.s3.amazonaws.com/songData.json'
const schema = buildSchema(`
	type Query {
		songs: [Song]
	}
	type Song {
		song: String
		artist: String
		playCount: Int
	}
`)
exports.lambdaHandler = async (event) => {
  const response = await axios.get(url);
  let handlerOuput = response.data;
  if (event.resource == '/songs/compact') {
    console.log('use graphql compact results');
    const root = {
      songs: () => response.data
    }
    const gqlRes = await graphql(schema, '{ songs { song artist playCount } }', root);
    handlerOuput = gqlRes.data.songs;
  }
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*"
    },
    body: JSON.stringify(handlerOuput)
  }
};
