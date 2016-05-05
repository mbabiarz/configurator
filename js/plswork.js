var App = React.createClass({
  getInitialState: function () {
    return {
      liked: false,
      pipeSize: '2 in.',
      hoseSize: '4/4',
      flangeYes: true,
      flangeNo: false,
      splashPlate: true
    };
  },
  
  handleClick: function(event) {
    this.setState({liked: !this.state.liked});
  },
  
  handleCheck: function(e) {
    this.setState({isChecked: !this.state.isChecked});
  },
  
  setPipeSize: function(e) {
    this.setState({ pipeSize: e.target.value });
//    console.log(pipeSize.value);
  },
  
  setHoseSize: function(e) {
    this.setState({ hoseSize: e.target.value });
  },
  
  setRadio: function(e) {
    var val = e.currentTarget;
    var newVal = {};
    newVal[val.id] = val.checked;
    this.setState(newVal);
    console.log(flangeYes.value);
    console.log(flangeNo.value);
  },
  
  toggleValue: function (event) {
    var val = event.currentTarget;
    var newVal = {};
    newVal[val.id] = val.checked;
    this.setState(newVal);
  },
  
  render: function() {
    var text = this.state.liked ? 'like' : 'haven\'t liked';
    var inlineStyle = { display:'inline' };
    
    return (      
      <div>
        <h2>Configure your tool</h2>
        
         <div>
          <label htmlFor="pipeSize">Pipe Size</label>
         <select id="pipeSize" defaultValue={this.state.pipeSize} onChange={this.setPipeSize}>
          <option value='2 in.'>2 in.</option>
          <option value='2.5 in.'>2.5 in.</option>
          <option value='3 in.'>3 in.</option>
          <option value='4 in.'>4 in.</option>
         </select>
         </div>
      
         <div>
         <label htmlFor="hoseSize"> Hose Size</label>
         <select id="hoseSize" defaultValue={this.state.hoseSize} onChange={this.setHoseSize}>
          <option value="4/4">4/4</option>
          <option value="5/4">5/4</option>
          <option value="6/4">6/4</option>
         </select>
         </div>
      
         <div>
          <p style={inlineStyle}><strong>Does the pipe have a flange?</strong></p>
          <input name="flange" id="flangeYes" defaultChecked type="radio" onChange={this.setRadio} />
          <label htmlFor="flangeYes"> Yes</label>
          <input name="flange" id="flangeNo" type="radio" onChange={this.setRadio} />
          <label htmlFor="flangeNo"> No</label>
        </div>
        
        {this.state.flangeNo && 
          <div>
            <input id="splashPlate" defaultChecked={this.state.splashPlate} type="checkbox" onChange={this.toggleValue}/>
            <label htmlFor="splashPlate">Splash Plate</label>
          </div>
        }
        

        <h2>Results</h2>
        <p>Pipe Size: {this.state.pipeSize}</p>
        <p>Hose Size: {this.state.hoseSize}</p>
        {this.state.flangeYes && <p>Flange: yes</p>}
        {this.state.flangeNo && this.state.splashPlate && <p>Splash plate: yes</p>}
      
        <h2>Toggle Experiments</h2>
        <p onClick={this.handleClick}>
          You {text} this. Click to toggle.
        </p>
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('content')
);