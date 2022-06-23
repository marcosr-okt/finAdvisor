import { CHANGE_RISK } from './actionTypes'

export const changeRisk = (content) => ({
  type: CHANGE_RISK,
  payload: {
    content,
  },
})