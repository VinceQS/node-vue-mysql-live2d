import $leaf from 'leaflet'
import 'leaflet/dist/leaflet.css'

const createMap = (divId, options) => {
  const map = $leaf.map(divId, options)
  return map
}
export default createMap
