import JSSHA from 'jssha'
import dotenv from 'dotenv'
import { SALT } from '../config'

dotenv.config()

export const getHash = (input: string) => {
  const shaObj = new JSSHA('SHA-512', 'TEXT', { encoding: 'UTF8' })
  shaObj.update(`${input}-${SALT}`)
  return shaObj.getHash('HEX')
}
