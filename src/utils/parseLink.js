export const parseLink = content => {
  const reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
  return content.replace(reg, "<a href='$1$2'>$1$2</a>");
};
