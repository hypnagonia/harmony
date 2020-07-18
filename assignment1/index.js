(async () => {
  const fs = require('fs')
  const Trie = require('./trie')

  function readCsv (filename) {
    return new Promise((resolve, reject) => {
      fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
          return reject(err)
        }
        resolve(data)
      })
    })
  }

  const data = await readCsv('./names.csv')
  const entries = data.split(`\r\n`)
  const trie = new Trie()

  entries.forEach(e => {
    trie.insertPath(e)
  })

  const json = JSON.stringify(trie.dumpPath())

  fs.writeFile('../assignment2/src/names.json', json, 'utf8', ()=>{});

  console.log(json)
})()