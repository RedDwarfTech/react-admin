export function getOrderByClause(sorter) {
    const field = sorter.field.replace(/[A-Z]/g, m => '_' + m.toLowerCase())
    const direction = sorter.order === 'descend' ? 'desc' : 'asc'
    return field + ' ' + direction
}
