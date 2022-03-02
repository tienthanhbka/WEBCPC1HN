import { login, logout, getInfo } from "@/api/user";
import {
  getToken,
  setToken,
  removeToken,
  removeNToken,
  getNToken,
  getIT,
  setIT,
  removeIT,
  getTypeEm,
  getName,
  setName,
  removeName,
  getIdUser,
  setIdUser,
  removeIdUser,
  getEmail,
  setEmail,
  removeEmail,
  getOTC,
  setOTC,
  removeOTC,
  setCode,
  getCode,
  removeCode,
  setGroup,
  getGroup,
  removeGroup
} from "@/utils/auth";
import { resetRouter } from "@/router";
const state = {
  token: getToken(),
  idUser: getIdUser(),
  name: getName(),
  it: getIT(),
  email: getEmail(),
  typeEm: getTypeEm(),
  employeeid: getIdUser(),
  otc: getOTC(),
  code: getCode(),
  group: getGroup()
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_IT: (state, it) => {
    state.it = it;
  },
  SET_EMAIL: (state, email) => {
    state.email = email;
  },
  SET_TYPE_EM: (state, typeEm) => {
    state.typeEm = typeEm;
  },
  SET_GROUP: (state, group) => {
    state.group = group;
  },
  SET_USERID: (state, employeeid) => {
    state.employeeid = employeeid;
  }
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ idEmployee: username.trim(), password: password })
        .then(response => {
          const data = response;
          commit("SET_TOKEN", data.token);
          commit("SET_NAME", data.Data.nameEmployee);
          commit("SET_IT", data.Data.it);
          commit("SET_EMAIL", data.Data.email);
          commit("SET_GROUP", data.Data.idGroup);
          commit("SET_USERID", data.Data.idEmployee);
          setToken(data.token);
          setIdUser(data.Data.idEmployee);
          setName(data.Data.nameEmployee);
          setIT(data.Data.it);
          setEmail(data.Data.email);
          setOTC(data.Data.otc);
          setCode(data.Data.employeeCode);
          setGroup(data.Data.idGroup)
          commit("SET_TYPE_EM", getTypeEm());
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then(response => {
          //  return;
          const data = response;
          if (!data) {
            reject("Verification failed, please Login again.");
          }
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout({
        ntoken: getNToken()
      })
        .then(() => {
          commit("SET_TOKEN", "");
          commit("SET_NAME", "");
          removeIT();
          removeToken();
          removeEmail();
          removeName();
          removeIdUser();
          removeNToken();
          removeOTC();
          removeCode();
          removeGroup();
          resetRouter();
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit("SET_TOKEN", "");
      removeToken();
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
