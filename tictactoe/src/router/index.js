import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import TicTacToe from '@/components/TicTacToe';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/ttt',
      name: 'TicTacToe',
      component: TicTacToe
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
});
