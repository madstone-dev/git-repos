export const parseQueryString = (url) => {
  const splited = url.split("?");
  const query = splited[splited.length - 1];
  if (!query) return {};
  return query.split("&").reduce((acc, e) => {
    const [key, value] = e.split("=");
    return { ...acc, [key]: value };
  }, {});
};
