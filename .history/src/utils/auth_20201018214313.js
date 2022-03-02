import Cookies from "js-cookie";
const TokenKey = "token";
const NToken = "ntoken";
const IDUserKey = "idEmployee";
const nameKey = "name";
const IT = "it";
const OTC = "otc";
const Email = "email";
const emCode = "employeeCode";
const groupKey = 'idGroup';
// const otcKey = 'otc'
// const employeeCodeKey = 'employee-code'
// const adminKey = 'admin'
 
// const orderLevelKey = 'Order_Level_View'
export function getTypeEm() {
  var otc = Cookies.get(OTC);
  if (otc == 4 || otc == 5 || otc == 6) {
    return "RDHC";
  }
  return "KD";
}

export function getIT() {
  return Cookies.get(IT);
}
export function getCode() {
  return Cookies.get(emCode);
}
export function setCode(code) {
  return Cookies.set(emCode, code, { expires: 365 });
}
export function setIT(it) {
  return Cookies.set(IT, it, { expires: 365 });
}
export function setGroup(group) {
  return Cookies.get(groupKey, group, { expires: 365 });
}
export function setEmail(email) {
  return Cookies.set(Email, email, { expires: 365 });
}
export function getEmail() {
  return Cookies.get(Email);
}
export function getGroup() {
  return Cookies.get(groupKey);
}
export function removeGroup() {
  return Cookies.get(groupKey);
}
export function removeEmail() {
  return Cookies.remove(Email);
}
export function removeCode() {
  return Cookies.remove(emCode);
}
export function removeIT() {
  return Cookies.remove(IT);
}
export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, { expires: 365 });
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function getNToken() {
  return Cookies.get(NToken);
}

export function setNToken(token) {
  return Cookies.set(NToken, token, { expires: 365 });
}

export function removeNToken() {
  return Cookies.remove(NToken);
}

export function getIdUser() {
  return Cookies.get(IDUserKey);
}

export function setIdUser(idUser) {
  return Cookies.set(IDUserKey, idUser, { expires: 365 });
}

export function removeIdUser() {
  return Cookies.remove(IDUserKey);
}

export function getName() {
  return Cookies.get(nameKey);
}

export function setName(name) {
  return Cookies.set(nameKey, name, { expires: 365 });
}

export function removeName() {
  return Cookies.remove(nameKey);
}
export function getOTC() {
  return Cookies.get(OTC);
}

export function setOTC(otc) {
  return Cookies.set(OTC, otc, { expires: 365 });
}

export function removeOTC() {
  return Cookies.remove(OTC);
}
