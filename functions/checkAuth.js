exports.handler = async (event, context) => {
  const {identity, user} = context.clientContext;
  console.log('function ran');

  const data = { name: 'mario', age: 35, job: 'plumber' };

  // return response to the browser
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  }
}