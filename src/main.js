import { createApp } from 'vue'
import { createWebHistory, createRouter } from 'vue-router'
import './style.css'
import App from './App.vue'
import Skeleton from '@brayamvalero/vue3-skeleton'
import '@brayamvalero/vue3-skeleton/dist/style.css'
import 'charts.css';

import CollectionView from './views/CollectionView.vue'
import ExpansionView from './views/ExpansionView.vue'
import FolderView from './views/FolderView.vue'
import SearchView from './views/SearchView.vue'
import SponsorView from './views/SponsorView.vue'
import InfoView from './views/InfoView.vue';
import PokemonView from './views/PokemonView.vue';

const routes = [
  { path: '/', component: CollectionView },
  { path: '/info', component: InfoView },
  { path: '/collection', component: CollectionView },
  { path: '/expansion', component: ExpansionView },
  { path: '/folder', component: FolderView },
  { path: '/search', component: SearchView },
  { path: '/sponsor', component: SponsorView },
  { path: '/pokemon/:national_no', component: PokemonView }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router).use(Skeleton).mount('#app')
