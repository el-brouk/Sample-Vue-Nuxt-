import type {MainPage} from "~/api/main";
import {defineStore} from "pinia";
import useSeoStore from "~/store/seo";
import {useApiFetch} from "~/composables/useApiFetch";

interface MainState {
}

const useMainStore = defineStore('main', {
    state: (): MainState => ({
    }),
    actions: {
        // Example
        async fetchTodos() {
            const {data, error, status} = await useApiFetch<MainPage>('/api/app/main/view');

            if (data) {
                
            }

            let seoStore = useSeoStore()
            //seoStore.setMeta({title: 'sdfsdf', description: 'sdfsdf'})

            return
        }
    },
})

export default useMainStore;