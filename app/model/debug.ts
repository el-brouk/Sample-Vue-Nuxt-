export interface DebugLog {
    id: string
    type: string
    ssr: boolean
    path: string
    dateFrom: Date
    dateTo: Date | null
    options: any
    status: string | number | null
}