import React from 'react'

export interface Column<T> {
    header: string
    key: keyof T | string
    render?: (item: T) => React.ReactNode
    className?: string
    align?: 'left' | 'right' | 'center'
}

export interface DataTableProps<T> {
    data: T[]
    columns: Column<T>[]
    emptyMessage?: string
    emptyIcon?: React.ReactNode
    isLoading?: boolean
    keyExtractor: (item: T) => string | number
}
