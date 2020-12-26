import { gql, useQuery, useMutation } from "@apollo/client";

interface GetVersionData {
  get_version: {
    version: string;
    commit_sha: string;
  };
}

const GET_VERSION = gql`
  {
    get_version {
      version
      commit_sha
    }
  }
`;

export const useGetVersion = () => useQuery<GetVersionData>(GET_VERSION);

type User = {
  id: string;
  email: string;
  name: string;
  role: string;
};

type Users = Array<User>;

interface ListUsersData {
  list_users: Users;
}

const LIST_USERS = gql`
  {
    list_users {
      id
      email
      name
      role
    }
  }
`;

export const useListUsers = () => useQuery<ListUsersData>(LIST_USERS);

interface GetUserData {
  get_user: User;
}

interface GetUserVariables {
  id: string;
}

const GET_USER = gql`
  query($id: ID!) {
    get_user(id: $id) {
      id
      email
      role
      name
    }
  }
`;

export const useGetUser = (id: string) =>
  useQuery<GetUserData, GetUserVariables>(GET_USER, { variables: { id } });

const CREATE_USER = gql`
  mutation($email: String!, $role: String, $name: String) {
    create_user(email: $email, role: $role, name: $name) {
      id
      email
      role
      name
    }
  }
`;

interface CreateUserData {
  create_user: User;
}

interface CreateUserVariables {
  email: string;
  name?: string;
  role?: string;
}

export const useCreateUser = () =>
  useMutation<CreateUserData, CreateUserVariables>(CREATE_USER, {
    update: (cache, { data }) => {
      if (!data?.create_user) return;
      cache.modify({
        fields: {
          list_users: (existingUsers = []) => {
            const newUser = cache.writeFragment({
              data: data.create_user,
              fragment: gql`
                fragment NewUser on Users {
                  id
                  email
                  role
                  name
                }
              `,
            });
            return [...existingUsers, newUser];
          },
        },
      });
    },
  });

const UPDATE_USER = gql`
  mutation($id: ID!, $email: String, $role: String, $name: String) {
    update_user(id: $id, email: $email, role: $role, name: $name) {
      id
      email
      role
      name
    }
  }
`;

interface UpdateUserData {
  update_user: User;
}

interface UpdateUserVariables {
  id: string;
  email?: string;
  name?: string;
  role?: string;
}

export const useUpdateUser = () =>
  useMutation<UpdateUserData, UpdateUserVariables>(UPDATE_USER);
