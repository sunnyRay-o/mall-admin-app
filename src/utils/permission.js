/**
 * 用户角色对应的路由权限
 */
const roleToRoute = {
  coustomer: [{
    name: "ProductList",
  },
  {
    name: "ProductAdd",
  },
  {
    name: "Product",
  },
  {
    name: "ProductEdit",
  },
  ],
  admin: [{
    name: "ProductList",
  },
  {
    name: "ProductAdd",
  },
  {
    name: "Product",
  },
  {
    name: "Category",
  },
  {
    name: "ProductEdit",
  },
  ],
};

/**
 * 过滤掉角色中不包含的路由
 * @param {*} role 角色
 * @param {*} routes 所有的路由
 */
export default function getMenuRoutes(role, routes) {
  const allowRoutesName = roleToRoute[role].map((item) => item.name); // 该角色拥有的路由权限
  const resultRoutes = routes.filter((item) => {
    // 判断，在allowRoutesName中找到的item.name留下
    const obj = item;
    if (allowRoutesName.indexOf(item.name) !== -1) {
      const {
        children,
      } = item;
      obj.children = children.filter((r) => allowRoutesName.indexOf(r.name) !== -1);
      return true;
    }
    return false;
  });
  return resultRoutes;
}
