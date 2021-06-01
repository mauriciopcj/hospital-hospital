import axios from "axios";

const baseUrl = "https://hosp-auth.herokuapp.com/auth";

interface IRequestProps {
  username: string;
  password: string;
}

const AuthService = {
  login: async ({ username, password }: IRequestProps) => {
    const body = { username, password };
    const { data: { token, user } } = await axios.post(baseUrl + "/login", body);
    localStorage.setItem('username', user.username);
    localStorage.setItem('authority', user.authority);
    localStorage.setItem("auth", token);
    return user;
  },

  isLoggedIn: () => {
    let token = localStorage.getItem('auth');
    
    if (token) {
      return true;
    }

    return false;
  },

  logout: () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("username");
    localStorage.removeItem("authority");
  },

  getUser: () => {
    let authority = localStorage.getItem("authority");
    let username = localStorage.getItem("username");
    return {
      authority,
      username
    }
  }
};

export default AuthService;
