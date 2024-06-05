class ARRAY_UTILS {
  getQualifiedArray(arr) {
    return Array.isArray(arr) ? arr : []
  }
}

const ArrayUtils = new ARRAY_UTILS()

export default ArrayUtils

export const getArrayFromValue = arr => (Array.isArray(arr) ? arr : [])
