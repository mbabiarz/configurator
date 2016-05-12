var App = React.createClass({
  getInitialState: function () {
    return {
      liked: false,
      pipeSize: '2 in.',
      hoseSize: '4/4',
      flange: true,
      plate: true
    };
  },
  
  handleCheck: function(e) {
    this.setState({isChecked: !this.state.isChecked});
  },
  
  updateFlange: function (nextState) {
    this.setState(nextState);
  },
  
  updatePlate: function (nextState) {
    this.setState(nextState);
  },
  
  setPipeSize: function(e) {
    this.setState({ pipeSize: e.target.value });
//    console.log(pipeSize.value);
  },
  
  setHoseSize: function(e) {
    this.setState({ hoseSize: e.target.value });
  },
  
//  Matt's checkbox example
//  toggleValue: function (event) {
//    var val = event.currentTarget;
//    var newVal = {};
//    newVal[val.id] = val.checked;
//    this.setState(newVal);
//  },
  
  
  //*****  RENDERING
  
  render: function() {
    var text = this.state.liked ? 'like' : 'haven\'t liked';
    var styleInline = { display:'inline' };
    
    return (      
      <div>
        <h2>Configure your tool</h2>
        
        {/* PIPE SIZE */}
        <div>
          <label htmlFor="pipeSize">Pipe Size</label>
          <select id="pipeSize" defaultValue={this.state.pipeSize} onChange={this.setPipeSize}>
          <option value='2 in.'>2 in.</option>
          <option value='2.5 in.'>2.5 in.</option>
          <option value='3 in.'>3 in.</option>
          <option value='4 in.'>4 in.</option>
          </select>
        </div>
      
        {/* HOSE SIZE */}
        <div>
          <label htmlFor="hoseSize"> Hose Size</label>
          <select id="hoseSize" defaultValue={this.state.hoseSize} onChange={this.setHoseSize}>
          <option value="4/4">4/4</option>
          <option value="5/4">5/4</option>
          <option value="6/4">6/4</option>
          </select>
         </div>
      
        {/* FLANGE */}
        <div>
          <p style={styleInline}><strong>Does the pipe have a flange?</strong></p>
          <input type="radio" name="flange" onClick={this.updateFlange.bind(null, {flange: true})} value="true" checked={this.state.flange} />
          <label> Yes</label>
          <input type="radio" name="flange" onClick={this.updateFlange.bind(null, {flange: false})} value="false" checked={!this.state.flange} />
          <label> No</label>
        </div>
        
        {/* PLATE */}                    
        {!this.state.flange && (
          <div>
            <p style={styleInline}><strong>Will you reuquire a splash plate?</strong></p>
            <input type="radio" name="plate" onClick={this.updatePlate.bind(null, {plate: true})} value="true" checked={this.state.plate} />
            <label> Yes</label>
            <input type="radio" name="plate" onClick={this.updatePlate.bind(null, {plate: false})} value="false" checked={!this.state.plate} />
            <label> No</label>
          </div>
        )}

        
        {/* Matt's checkbox                     
        {!this.state.flange && (
          <div>
            <input id="splashPlate" defaultChecked={this.state.splashPlate} type="checkbox" onChange={this.toggleValue}/>
            <label htmlFor="splashPlate">Splash Plate</label>
          </div>
        )} */}


        
        {/* RESULTS */}
        <h2>Results</h2>
        <p>Pipe Size: {this.state.pipeSize}</p>
        <p>Hose Size: {this.state.hoseSize}</p>
        <p>{this.state.flange ? 'Flange: yes' : 'Flange: no'}</p>
        {!this.state.flange && this.state.plate ? 'Plate: yes' : 'Plate: no'}
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('content')
);