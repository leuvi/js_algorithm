import '@less/index.less'
import { binary_search1 } from './algorithms/binary_search'

var arr = [...Array(100000)].map((v, k) => k)

binary_search1(arr, 9997)