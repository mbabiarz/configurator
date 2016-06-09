
var hose_sizes = {
  "4/4": [75,100,150],
  "5/4": [75,100,200],
};

React.createClass({

getInitialState: function () {
  return {
    hose_size: '4/4',
  };
},

render: function () {
  return (
  …
    <select onchange={this.handleChange}>
      <option>4/4</option>
      <option>5/4</option>
      <option>6/4</option>
    </select>
  …
    <select>
    {hose_sizes[this.state.hose_size].forEach(option =>{
      return (
        <option>{option}</option>);
    })}
    </select>
  …
  );
},

//---

render: function () {
  
  return (
  …
    <select>
      {this.state.hose_size === '4/4' && this.state.hose_size === '5/4' && <option>Option A</option>}
      {this.state.hose_size === '5/4' && [
        <option>Option B</option>,
        <option>Option B</option>
      ]}
      {this.state.hose_size !== '6/4' && (
        <optgroup>
          <option>Option C</option>
          <option>Option C</option>
        </optgroup>
      )}
    </select>
  …
  );
},