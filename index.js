import { request } from 'graphql-request';

const url = 'http://localhost:4000/graphql';

const requestQuery = async (query) => {
  return await request(url, query);
};

const requestMutation = async (mutation, params) => {
  return await request(url, mutation, params);
};

const queryUsers = async () => {
  const query = `
    query listUsers {
      allUsers {
        name
        avatar
      }
    }
  `;

  try {
    const data = await requestQuery(query);
    console.info(data);
  } catch (e) {
    console.error('エラーだよ');
  }
};

const mutationUsers = async (count) => {
  const mutation = `
    mutation populate($count: Int!) {
      addFakeUsers(count: $count) {
        name
      }
    }
  `;

  try {
    const data = await requestMutation(mutation, { count });
    console.info(data);
  } catch (e) {
    console.error('エラーだよ: ' + e);
  }
};

const arg = process.argv[2];
switch (arg) {
  case 'queryUsers':
    queryUsers().then();
    break;
  case 'mutationUsers':
    mutationUsers(10).then();
    break;
}


