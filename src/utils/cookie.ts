import cookies from "js-cookie";

type Cookies = "MyToken";

export function setCookie(name: Cookies, value: string) {
  return cookies.set(name, value);
}

export function getCookie(name: Cookies) {
  return cookies.get(name);
}

export function removeCookie(name: Cookies) {
  return cookies.remove(name);
}
