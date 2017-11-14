Array.compare = (...arrays) => {
  if (arrays.length < 2) return []

  let symmetric = false

  if (typeof arrays[arrays.length - 1] === 'boolean') {
    symmetric = true
    arrays.splice(-1)
  }

  if (symmetric) return Array.compare(...arrays).concat(Array.compare(...arrays.reverse()))

  let diff = []
  let set = new Set(arrays[arrays.length - 1])
  for (let i = 0; i < arrays.length; i++) {
    let array = arrays[i]
    if (!Array.isArray(array)) throw new TypeError(`arguments[${i}] must be an Array`)

    for (let item of array) {
      if (!set.has(item)) diff.push(item)
    }
  }

  return diff
}
