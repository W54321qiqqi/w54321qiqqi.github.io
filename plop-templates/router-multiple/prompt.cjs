module.exports = {
  description: '创建多级权限路由',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: '请输入路由名称',
      validate: (v) => {
        if (!v || v.trim === '') {
          return '路由名称不能为空'
        } else {
          return true
        }
      },
    },
  ],
  actions: () => {
    const actions = [
      {
        type: 'add',
        path: 'src/router/modules/{{camelCase name}}.ts',
        templateFile: 'plop-templates/router-multiple/index.hbs',
      },
    ]
    return actions
  },
}
