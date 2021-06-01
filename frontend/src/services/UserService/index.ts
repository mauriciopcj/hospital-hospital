import axios from "axios";

const baseUrl = "https://hosp-auth.herokuapp.com";

interface IRequestProps {
  username: string;
  password: string;
}

const get_headers = () => {
  let token = localStorage.getItem('auth');

  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
}

const UserService = {
  getAll: async () => {
    const header = get_headers();
    const { data: { accounts } } = await axios.get(baseUrl + "/accounts", header);
    return accounts;
  },

  create: async ({ username, password }: IRequestProps) => {
    const obj = { username, password, authority: "USER" };
    const response = await axios.post(baseUrl + "/accounts", obj);
    
    return response.data;
  },

  delete: async (id: number) => {
    const response = await axios.delete(baseUrl + `/accounts/${id}`);

    return response.data;
  },

  updateUsername: async (username: string, id: number) => {
    const obj = { username };
    const response = await axios.put(baseUrl + `/accounts/${id}`, obj);

    return response.data;
  },
};

export default UserService;
