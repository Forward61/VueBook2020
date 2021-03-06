import Vue from 'vue'
import VueRouter from 'vue-router'

import BookManage from "../views/BookManage";
import AddBook from "../views/AddBook";
import SearchBook from "../views/SearchBook";

import Index from "../views/Index";
import BookUpdate from "../views/BookUpdate";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '图书管理',
    component: Index,
    show:true,
    redirect : '/BookManage',
    children: [
      {
        path: '/BookManage',
        name: '查询图书',
        component: BookManage
      },
      {
        path: '/AddBook',
        name: '添加图书',
        component: AddBook
      },
      {
        path: '/search',
        name: '搜索',
        show: true,
        component: SearchBook
      }
    ]
  },
  {
    path: '/update',
    name: '编辑',
    show: false,
    component: BookUpdate
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
