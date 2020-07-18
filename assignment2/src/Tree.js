import React, { Component } from 'react'
import SortableTree from 'react-sortable-tree'
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer'
import names from './names.json'
import { mapNamesForTreeView } from './mapNamesForTreeView'

const mappedNames = mapNamesForTreeView(names)

export default class Tree extends Component {
  constructor (props) {
    super(props)

    this.state = {
      treeData: mappedNames,
      entryName: ''
    }
  }

  createEntry = (e) => {
    const newNode = { title: this.state.entryName, children: [] }
    this.setState({ entryName: '', treeData: [newNode, ...this.state.treeData] })
    e.preventDefault()
  }

  handleChange = (key) => (event) => {
    this.setState({ [key]: event.target.value })
  }

  render () {
    return (
      <div style={{ height: 2000 }}>
        <form onSubmit={this.createEntry}>
          <input type="text" placeholder="New Entry" value={this.state.entryName}
                 onChange={this.handleChange('entryName')}/>
          <input type="submit" value="Create"/>
        </form>

        <SortableTree
          treeData={this.state.treeData}
          onChange={treeData => this.setState({ treeData })}
          theme={FileExplorerTheme}
        />
      </div>
    )
  }
}