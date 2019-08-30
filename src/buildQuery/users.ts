import { GET_LIST, GET_ONE, CREATE, UPDATE, DELETE } from "react-admin";

import gql from "graphql-tag";

const processUser = (user: any) => {
  user.id = JSON.parse(user.id);
  return user;
};

const usersQuery = (raFetchType: any, params: any) => {
  switch (raFetchType) {
    case GET_LIST:
      return {
        query: gql`
          {
            users {
              id
              email
              name
              role
            }
          }
        `,
        variables: params,
        parseResponse: (response: any) => ({
          data: response.data.users.map(processUser),
          total: response.data.users.length
        })
      };
    case GET_ONE:
      return {
        query: gql`
          query($id: ID!) {
            get_user(id: $id) {
              id
              email
              role
              name
            }
          }
        `,
        variables: params,
        parseResponse: (response: any) => ({
          data: processUser(response.data.get_user)
        })
      };
    case CREATE:
      return {
        query: gql`
          mutation($email: String, $role: String, $name: String) {
            create_user(email: $email, role: $role, name: $name) {
              id
              email
              role
              name
            }
          }
        `,
        variables: params.data,
        parseResponse: (response: any) => ({
          data: processUser(response.data.create_user)
        })
      };
    case UPDATE:
      return {
        query: gql`
          mutation($id: ID!, $email: String, $role: String, $name: String) {
            update_user(id: $id, email: $email, role: $role, name: $name) {
              id
              email
              role
              name
            }
          }
        `,
        variables: params.data,
        parseResponse: (response: any) => ({
          data: processUser(response.data.update_user)
        })
      };
    case DELETE:
      return {
        query: gql`
          mutation($id: ID!) {
            delete_user(id: $id) {
              id
            }
          }
        `,
        variables: params,
        parseResponse: (response: any) => ({
          data: processUser(response.data.delete_user)
        })
      };
  }
  console.error(`Unsupported op ${raFetchType} for resource user`);
  console.error(params);
};

export default usersQuery;
