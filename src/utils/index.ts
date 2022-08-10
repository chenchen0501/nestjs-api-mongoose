/**
 * 转换查询，模糊查询字段
 *
 * @param {*} query 所有查询参数
 * @param {Array<string>} blurryKeys 需要模糊查询的字段
 * @return {*} 转换之后的查询参数
 */
export const convertQuery = (query = {}, blurryKeys: Array<string>) => {
  const result = {};

  for (let key in query) {
    if (query[key]) {
      result[key] = blurryKeys.includes(key)
        ? new RegExp(query[key])
        : query[key];
    }
  }

  return result;
};
