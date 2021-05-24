import axios from "axios";

const baseUrl = "http://localhost:3001";

interface IRequestProps {
  username: string;
  password: string;
}

const UserService = {
  getAll: async () => {
    const { data: { user } } = await axios.get(baseUrl + "/users");
    return user;
  },

  create: async ({ username, password }: IRequestProps) => {
    const obj = { username, password, authority: "USER" };
    const response = await axios.post(baseUrl + "/users", obj);
    
    return response.data;
  },

  delete: async (id: number) => {
    const response = await axios.delete(baseUrl + `/users/${id}`);

    return response.data;
  },

  updateUsername: async (username: string, id: number) => {
    const obj = { username };
    const response = await axios.put(baseUrl + `/users/${id}`, obj);

    return response.data;
  },
};

export default UserService;
