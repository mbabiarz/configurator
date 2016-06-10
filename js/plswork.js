var App = React.createClass({
  getInitialState: function () {
    return {
      liked: false,
      pipeSize: '2 in.',
      hoseSize: '4/4',
      flange: true,
      plate: true,
      hoseKit: 'None',
      done: false,
    };
  },
  
  updateRadio: function (nextState) {
    this.setState(nextState);
  },
  
  // TODO: we can probably refactor to a single change handler for select options that change state
  setPipeSize: function(e) {
    this.setState({ pipeSize: e.target.value });
//    console.log(pipeSize.value);
  },
  
  setHoseSize: function(e) {
    this.setState({ hoseSize: e.target.value });
  },
  
  setHoseKit: function(e) {
    this.setState({ hoseKit: e.target.value });
  },
  
//  Matt's checkbox example
//  handleCheck: function(e) {
//    this.setState({isChecked: !this.state.isChecked});
//  },
//  toggleValue: function (event) {
//    var val = event.currentTarget;
//    var newVal = {};
//    newVal[val.id] = val.checked;
//    this.setState(newVal);
//  },
  
  
  //*****  RENDERING
  
  render: function() {
//    var text = this.state.liked ? 'like' : 'haven\'t liked';
    var styleInline = { display:'inline' };
    
    return (      
      <div>
        <div className="col-md-4">
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
            <input type="radio" name="flange" onClick={this.updateRadio.bind(null, {flange: true})} value="true" checked={this.state.flange} />
            <label> Yes</label>
            <input type="radio" name="flange" onClick={this.updateRadio.bind(null, {flange: false})} value="false" checked={!this.state.flange} />
            <label> No</label>
          </div>

          {/* PLATE */}                    
          {!this.state.flange && (
            <div>
              <p style={styleInline}><strong>Will you require a splash plate?</strong></p>
              <input type="radio" name="plate" onClick={this.updateRadio.bind(null, {plate: true})} value="true" checked={this.state.plate} />
              <label> Yes</label>
              <input type="radio" name="plate" onClick={this.updateRadio.bind(null, {plate: false})} value="false" checked={!this.state.plate} />
              <label> No</label>
            </div>
          )}

          {/* HOSE KIT */}
          <div>
            <label htmlFor="pipeSize">Hose Kit</label>
            <select id="pipeSize" defaultValue={this.state.hoseKit} onChange={this.setHoseKit}>
            <option value='None'>None</option>
            <option value='75 ft'>75 ft</option>
            <option value='100 ft'>100 ft</option>
            </select><br/>
            Optional Hose Kit includes:
              <ul>
                <li>Hose (selected size and length)</li>
                <li>Hose stop collet</li>
                <li>22k Banshee Beetle rotary tool</li>
              </ul>
          </div>


          {/* Matt's checkbox   
          <div>
            <p>Choose a hose kit (optional):
            <input id="splashPlate" defaultChecked={this.state.splashPlate} type="checkbox" onChange={this.toggleValue}/>
            <label htmlFor="splashPlate"> Splash Plate</label>
          </div> */} 
        </div>

        
        {/* RESULTS */}
        <div className="col-md-4">
          <h2>Results</h2>
          <p>Pipe Size: {this.state.pipeSize}<br/>
            Hose Size: {this.state.hoseSize}<br/>{this.state.flange ? 'Flange: yes' : 'Flange: no'}<br/>
            {!this.state.flange && this.state.plate ? 'Plate: yes' : 'Plate: no'}<br/>
            Hose Kit: {this.state.hoseKit}</p>

          {/* EMAIL RESULTS */}
          <div>
            {!this.state.done && <input type="button" value="Email to Sales" onClick={this.updateRadio.bind(null, {done: true})}/>}
    
            {this.state.done && (
              <form action="https://formspree.io/margaret.babiarz@stoneagetools.com"
      method="POST">
                <input type="hidden" name="Example" value={this.state.flange} />
                <input type="text" name="Name" placeholder="Full Name"/>
                <input type="text" name="company" placeholder="Company Name"/>
                <input type="email" name="_replyto" placeholder="Work Email"/>
                <input type="submit" value="Send"/>
              </form>
            )}
          </div>
        </div>
          
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('appContent')
);