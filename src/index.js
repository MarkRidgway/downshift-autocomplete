import React from 'react';
import ReactDOM from 'react-dom';
import Downshift from 'downshift';
import { all as starWarsNames } from 'starwars-names';
import { matchSorter } from 'match-sorter';

const items = starWarsNames.map((name) => ({
  value: name,
  id: name.toLowerCase(),
}));

const getItems = value => value ? matchSorter(items, value, {keys: ['value']}) : items;

const itemToString = item => item ? item.value : '';

const stateReducer = (state, changes) => {
  if(changes.type === Downshift.stateChangeTypes.blurButton) {
    return {...changes, isOpen: true };
  }

  return changes;
}

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Autocomplete rocks!</h1>
        <div>
          <Downshift stateReducer={stateReducer} itemToString={itemToString}>
            {({
              clearSelection,
              getInputProps,
              getItemProps,
              getLabelProps,
              getMenuProps,
              getToggleButtonProps,
              inputValue,
              isOpen,
              selectedItem,
            }) => (
              <div>
                <label {...getLabelProps()} >Select a Star Wars Character</label>
                <input {...getInputProps()} />
                <button {...getToggleButtonProps()}>{isOpen ? 'close' : 'open' }</button>
                {selectedItem ? <button onClick={clearSelection}>x</button> : null}
                <ul {...getMenuProps({style: {maxHeight: 300, overflowY: 'scroll'}})}>
                  { isOpen
                    ? getItems(inputValue).map((item) => (
                      <li {...getItemProps({
                        item,
                        key: item.id,
                      })}>
                        {item.value}
                      </li>
                    ))
                    : null }
                </ul>
              </div>
            )}
          </Downshift>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
