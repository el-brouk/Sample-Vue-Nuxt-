import type { SeoMeta } from '~/model/seo';
// import useSettingsStore from '~/store/settings';

export interface SeoState {
  meta: SeoMeta;
}

const useSeoStore = defineStore('seo', {
  state: (): SeoState => ({
    meta: {
      title: 'apteka 22',
      description: '',
      keywords: '',
    },
  }),
  actions: {
    async setMeta(item: SeoMeta) {
      this.meta = item;
      useHead({
        title: this.meta.title,
        meta: [
          { name: 'description', content: this.meta.description },
          { name: 'keywords', content: this.meta.keywords },
        ],
      });
    },
    async applyMeta(route: any) {
      //   let settingsStore = useSettingsStore();

      let self = this;
      //   settingsStore.settings.seoMetas.forEach(function (item, key) {
      //     if (item.canonical == route.path) {
      //       self.setMeta(item);
      //     }
      //   });
    },
  },
});

export default useSeoStore;
