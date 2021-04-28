
import moment from 'moment'

export function getOrderByClause(sorter) {
    const field = sorter.field.replace(/[A-Z]/g, m => '_' + m.toLowerCase())
    const direction = sorter.order === 'descend' ? 'desc' : 'asc'
    return field + ' ' + direction
}

export function formatTime(time) {
   return moment.unix(parseInt(time) / 1000).format('YYYY-MM-DD HH:mm:ss')
}

