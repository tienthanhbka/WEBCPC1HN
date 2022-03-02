const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  it: state => state.user.it,
  employeeid: state => state.user.employeeid
};
export default getters;
