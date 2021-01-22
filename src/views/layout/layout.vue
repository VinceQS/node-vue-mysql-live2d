<template>
  <div :class="{'active':isCollapse}">
    <div class="main-sidebar">
      <side-bar class="sidebar-container"></side-bar>
    </div>
    <div class="main-container">
      <nav-bar></nav-bar>
      <app-main></app-main>
    </div>
  </div>
</template>
<script>
import { sideBar, navBar, appMain } from './components'
import store from '@/store'
export default {
  components: {
    sideBar,
    navBar,
    appMain
  },
  data() {
    return {

    }
  },
  computed: {
    isCollapse: () => {
      return store.getters.isCollapse
    }
  },
  methods: {

  }
}
</script>

