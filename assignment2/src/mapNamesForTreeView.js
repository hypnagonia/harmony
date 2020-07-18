export const mapNamesForTreeView = (arr) => {

  function traverse (arr) {
    const res = []

    for (let i = 0; i < arr.length; i++) {
      if (typeof arr[i] === 'string') {
        res.push({ title: arr[i] })
      } else {
        const o = arr[i]
        const keys = Object.keys(o)

        keys.forEach(key => {
          res.push({ title: key, children: traverse(o[key]) })
        })
      }
    }

    return res
  }

  return traverse(arr)
}