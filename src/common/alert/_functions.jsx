/**
 * @type {TypeType} = 'danger' | 'info' | 'success' | 'warning'
 */
/**
 * @param {type}    ?: TypeType      <Appearances of alert>
 */
export const getValidType = (type = 'info') =>
  ['danger', 'info', 'success', 'warning'].includes(type) ? type : 'info'
