import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  state = {
    value: '',
    items: [],
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  addItem = event => {
    event.preventDefault();
    this.setState(oldState => ({
      items: [...oldState.items, this.state.value],
    }));
  };

  deleteLastItem = event => {
    this.setState(prevState => ({ items: this.state.items.slice(0, -1) }));
  };

  inputIsEmpty = () => {
    return this.state.value === '';
  };

  noItemsFound = () => {
    return this.state.items.length === 0;
  };

  render() {
    return (
      <div className="App">
        <Header />    
        <AppTitle />
        <Form 
          addItem={this.addItem}
          value={this.state.value}
          handleChange={this.handleChange}
          inputIsEmpty={this.inputIsEmpty}
          />
        <DeleteButton 
          deleteLastItem={this.deleteLastItem}
          noItemsFound={this.noItemsFound}
          />
        <ListTitle />
        <ItemList 
          items={this.state.items}
          />        
      </div>
    );
  }
}

function Header(props){
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">ReactND - Coding Practice</h1>
    </header>
  )
}

const AppTitle = () => (<h2>Shopping List</h2>);

function Form(props){
  return(
    <form onSubmit={props.addItem}>
      <input
        type="text"
        placeholder="Enter New Item"
        value={props.value}
        onChange={props.handleChange}
        />
      <button disabled={props.inputIsEmpty()}>Add</button>
    </form>
  )
}

function DeleteButton(props) {
  return (
    <button onClick={props.deleteLastItem} disabled={props.noItemsFound()}>
      Delete Last Item
    </button>
  )
}

const ListTitle = () => (<p className="items">Items</p>);

function ItemList(props) {
  return (
    <ol className="item-list">
      {props.items.map((item, index) => <li key={index}>{item}</li>)}
    </ol>
  )
}

export default App;
