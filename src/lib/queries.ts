import { gql, useQuery, useMutation } from "@apollo/client";

type User = {
  id: string;
  email: string;
  name: string;
  role: string;
};

type Users = Array<User>;

interface ListUsersData {
  users: Users;
}

const LIST_USERS = gql`
  {
    users {
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
      email
    }
  }
`;

interface CreateUserData {
  create_user: {
    email: string;
  };
}

interface CreateUserVariables {
  email: string;
  name?: string;
  role?: string;
}

export const useCreateUser = () =>
  useMutation<CreateUserData, CreateUserVariables>(CREATE_USER);

const UPDATE_USER = gql`
  mutation($id: ID!, $email: String, $role: String, $name: String) {
    update_user(id: $id, email: $email, role: $role, name: $name) {
      id
    }
  }
`;

interface UpdateUserData {
  update_user: {
    id: string;
  };
}

interface UpdateUserVariables {
  id: string;
  email?: string;
  name?: string;
  role?: string;
}

export const useUpdateUser = () =>
  useMutation<UpdateUserData, UpdateUserVariables>(UPDATE_USER);
