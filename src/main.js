import { createApp } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import './style.css'
import App from './App.vue'


import CollectionView from './views/CollectionView.vue'
import ExpansionView from './views/ExpansionView.vue'
import FolderView from './views/FolderView.vue'
import SearchView from './views/SearchView.vue'
import SponsorView from './views/SponsorView.vue'

const routes = [
  { path: '/', component: CollectionView },
  { path: '/collection', component: CollectionView },
  { path: '/expansion', component: ExpansionView },
  { path: '/folder', component: FolderView },
  { path: '/search', component: SearchView },
  { path: '/sponsor', component: SponsorView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
