exports.handler = async (event, context) => {
  // console.log('function ran');

  const guides = [
    { title: 'Beat all Zelda Bosses Like a Boss', author: 'mario' },
    { title: 'Mario Kart Shorcuts You Never Knew Existed', author: 'luigi' },
    { title: 'Ultimate Street Fighter Guide', author: 'chun-li' },
  ];

  const { identity, user } = context.clientContext;
  // console.log(identity);
  // console.log(user);

  if (user) {
    // return response to the browser if there is a user logged in
    return {
      statusCode: 200,
      body: JSON.stringify(guides),
    }
  }

  return {
    statusCode: 401,
    body: JSON.stringify({ message: 'You must be logged in to see this.' }),
  }
}