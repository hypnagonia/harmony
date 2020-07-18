class Trie {
  constructor () {
    this.children = {}
    this.isWord = false
  }

  insertPath (str) {
    const keys = str.split('_')
    let children = this.children

    keys.forEach((key, index) => {
      if (!children.hasOwnProperty(key)) {
        children[key] = new Trie()
      }

      if (index === keys.length - 1) {
        children[key].isWord = true
      }

      children = children[key].children
    })
  }

  isLeaf () {
    return Object.keys(this.children).length === 0
  }

  static addKeyPrefix (key, prefix = '') {
    if (!prefix) return key
    return `${prefix}_${key}`
  }

  dumpPath (prefix = '') {
    const res = []
    const keys = Object.keys(this.children)

    keys.forEach(key => {
      const prefixedKey = Trie.addKeyPrefix(key, prefix)

      const child = this.children[key]

      if (child.isLeaf()) {
        res.push(prefixedKey)
      } else {
        // loop is usually better than recursion
        // while traversing a tree. but did it for clarity
        const children = child.dumpPath(prefixedKey)
        const value = child.isWord ? [prefixedKey, ...children] : children
        const childOnlyKey = Object.keys(value[0])

        if (value.length === 1) {
          if (value[0][childOnlyKey]) {

            if (value[0][childOnlyKey].length === 1) {
              // if only one element in a group we don't need group
              res.push(...value[0][childOnlyKey])
            } else {
              res.push({ [Trie.addKeyPrefix(childOnlyKey, key)]: value[0][childOnlyKey] })
            }

          } else {
            res.push(...value)
          }
        } else {
          res.push({ [key]: value })
        }

      }
    })

    return res
  }
}

module.exports = Trie
