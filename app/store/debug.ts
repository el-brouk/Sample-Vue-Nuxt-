import type {DebugLog} from "~/model/debug";
import {defineStore} from "pinia";

export interface DebugState {
    log: DebugLog[]
}

const useDebugStore = defineStore('debug', {
    state: (): DebugState => ({
        log: []
    }),
    actions: {
        async addToLog(item: DebugLog) {
            if (item.dateTo && item.dateFrom) {
                console.debug(item.type.toUpperCase() + ' ' + item.status + ' ' + item.path, item.options, (item.dateTo.getTime() - item.dateFrom.getTime()) + 'ms')
            }
            this.log.push(item)
        }
    },
});

export default useDebugStore;
