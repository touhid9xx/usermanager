import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);


import Home from './components/pages/home';
import About from './components/pages/about';
import Contact from './components/pages/contact';
import Dashboard from './components/pages/admin/dashboard';
import Users from './components/pages/user/users';
import User from './components/pages/user/user';
import UserInfo from './components/pages/user/userinfo';
import UserOrder from './components/pages/user/userorders';
import UserEdit from './components/pages/user/useredit';


  const  routes = [
    {
        path: '/',
        component: Home,

    },



    {
        path: '/about',
        component: About,
        name: 'about',
        meta: {  title: 'About page'}
    },

    {
        path: '/contact',
        component: Contact,
        name: 'contact',
        meta: { title: 'Contact page'}
    },

    {
      path: '/dashboard',
      component: Dashboard,
      name: 'dashboard',
      meta: { title: 'Dashboard'}
  },
  {
    path: '/users',
    component: Users,
    name: 'users',
    meta: { title: 'Users'},
    children: [
        {
            path:':id',
            name: 'user',
            // redirect: { name: "user-info" },
            component: User,
            meta: { title: 'User Page'},
            props:true,
            children: [
                {
                    path: '/',
                    redirect: { name: "user-info" }
                },
                {
                    path:'info',
                    name: "user-info",
                    component: UserInfo,
                    meta: { title: 'User Information'},
                    props: true
                },
                {
                    path: 'orders',
                    name: 'user-orders',
                    component:UserOrder,
                    meta: 'User Orders',
                    props:true,
                },
                {
                    path: 'edit',
                    name: 'user-edit',
                    component:UserEdit,
                    meta: 'User Edit',
                    props:true,
                },
            ]
        }

    ]
    },


    ];


  const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  });

router.beforeEach((to,from,next) =>{
    document.title = to.meta.title
    next()
})


export default router;
