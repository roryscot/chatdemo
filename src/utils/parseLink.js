export const validURL = str => {
  let pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
};

export const formatUrl = str => {
  let reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
  return reg.test(str) ? str : "https://www." + str;
};

export const extractURLs = str => {
  return str
    .split(" ")
    .map(s => (validURL(s) ? s : false))
    .filter(s => typeof s === "string");
};

// TODO: format before returning
export const parseLink = content => {
  let reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
  return content.replace(reg, "<a href='$1$2'>$1$2</a>");
};
