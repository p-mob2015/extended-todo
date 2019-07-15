import uuid from 'uuid/v1'

export const generateId = prefix => {
  return `${prefix}-${uuid()}`
}
