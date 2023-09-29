export default [
  { path: '/user', layout: false, routes: [{ path: '/user/login', component: './User/Login' }, {path: '/user/register', component: './User/Register'}] },
  { path: '/welcome', icon: 'smile', component: './Welcome' },
  { path: '/', redirect: '/add_chart' },
  { path: '/add_chart', name: '智能分析', icon: 'barChart', component: './AddChart' },
  { path: '/ai_talk', name: 'AI助手', icon: 'barChart', component: './AiTalk' },
  { path: '/assistant_list', name: 'AI助手列表', icon: 'fontColors', component: './AssistantList' },
  { path: '/add_chart_async', name: '智能分析（异步）', icon: 'barChart', component: './AddChartAsync' },
  { path: '/add_chart_mq', name: '智能分析（MQ）', icon: 'barChart', component: './AddChartMq' },
  { path: '/my_chart', name: '历史分析', icon: 'pieChart', component: './MyChart' },
  { path: '/my_info', name: '个人中心', icon: 'userOutlined', component: './MyInfo' },
  { path: '/chart_detail/:id', name: '分析详情', icon: 'pieChart', component: './ChartDetail', hideInMenu: true},
  { path: '/chat_with_assistant/:id', name: '聊天助手', icon: 'pieChart', component: './ChatWithAssistant', hideInMenu: true},
  { path: '/ai_assistant_table', name: '助手管理', access: 'canAdmin', icon: 'pieChart', component: './AiAssistantTable'},
  {
    path: '/admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', name: '管理页面', redirect: '/admin/sub-page' },
      { path: '/admin/sub-page', name: '管理页面2', component: './Admin' },
    ],
  },
  { icon: 'table', path: '/list', component: './TableList' },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];

