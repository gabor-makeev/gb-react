import React, {Component} from "react"
import style from './Header.module.scss'

export class Header extends Component {
  state = {
    h1: 'Header',
    editingMode: false,
  }

  toggleEditingMode = () => {
    this.setState({
      editingMode: !this.state.editingMode
    })
  }

  changeHeader = (e) => {
    this.setState({
      h1: e.target.value
    })
  }

  render() {
    return (
      <header className={style.header}>
        {!this.state.editingMode &&
          <h1 onClick={this.toggleEditingMode}>{this.state.h1}</h1>
        }
        {this.state.editingMode &&
          <div className={style['header-editor']}>
            <label>New header:
              <input type="text" onChange={this.changeHeader} value={this.state.h1}/>
            </label>
            <button onClick={this.toggleEditingMode}>submit</button>
          </div>
        }
      </header>
    )
  }
}