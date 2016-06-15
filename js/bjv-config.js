const App = React.createClass({
  getInitialState: function () {
    return {
      pressure: 0,
      flow: 0,
      pipeSize: 0,
      rotation: 0,
      inlet: '1 NPT',
      swivel: '',
      hoseSize: '4 mm',
      hoseLength: 0,
      headType: '',
      notes: '',
      done: false,
      tab: 1
    };
  },
  
  changeTab: function (tab) {
    this.setState({tab: tab});
  },
  
  getActiveClass: function (tab) {
    var className = 'tab-nav';
    if (this.state.tab === tab) {
      return className +' tab-nav-active';
    }
    return className;
  },
  
  updateRadio: function (nextState) {
    this.setState(nextState);
  },
  
  handleCheck: function(e) {
    this.setState({isChecked: !this.state.isChecked});
  },
  
  toggleValue: function (event) {
    var val = event.currentTarget;
    var newVal = {};
    newVal[val.id] = val.checked;
    this.setState(newVal);
  },
  
  // TODO: we can probably refactor to a single change handler for select options that change state
  setPressure: function(e) {
    this.setState({ pressure: e.target.value });
  },
  
  setFlow: function(e) {
    this.setState({ flow: e.target.value });
  },
  
  setPipeSize: function(e) {
    this.setState({ pipeSize: e.target.value });
  },
  
  setRotation: function(e) {
    this.setState({ rotation: e.target.value });
  },
  
  setInlet: function(e) {
    this.setState({ inlet: e.target.value });
  },
  
  setHoseSize: function(e) {
    this.setState({ hoseSize: e.target.value });
  },
  
  setHoseLength: function(e) {
    this.setState({ hoseLength: e.target.value });
  },
  
  setNotes: function(e) {
    this.setState({ notes: e.target.value });
  },
  
  render() {
    var styleInline = { display:'inline' };
    var marginLeft21 = { marginLeft:'21px' };
    var errorMsg = { color:'#9e6033', margin:0, fontSize:'12px', fontStyle:'italic' };
    var tab = this.state.tab;
    
    return (
      <div>
      
        <h1>Configure your equipment</h1>
        
        {/* TAB NAV */}
        <span onClick={this.changeTab.bind(null, 1)} className={this.getActiveClass(1)}>1. Parameters</span>
        <span onClick={this.changeTab.bind(null, 2)} className={this.getActiveClass(2)}>2. Head Selection</span>
        <span onClick={this.changeTab.bind(null, 3)} className={this.getActiveClass(3)}>3. Options</span>
        <span onClick={this.changeTab.bind(null, 4)} className={this.getActiveClass(4)}>4. Notes</span>
        <span onClick={this.changeTab.bind(null, 5)} className={this.getActiveClass(5)}>5. Summary</span>

        {/* TAB 1 CONTENT */}
        {tab === 1 && (
          <div className="tab-content">
            {/* PRESSURE */}
            <div className="tab-row bg-lt-grey">
              <label className="even-120">Operating Pressure</label>
                <input
                  type="text"
                  name="pressure"
                  value={this.state.pressure ? this.state.pressure : ''}           onChange={this.setPressure}
                />
              <small className="grey">2000 - 40000 psi</small>
              {isNaN(this.state.pressure) && (<p style={errorMsg}>Pressure should be a number between 2000-40000 with no commas.</p>)}
            </div>     
            {/* FLOW */}
            <div className="tab-row">
              <label className="even-120">Operating Flow</label>
                <input
                  type="text"
                  name="flow"
                  value={this.state.flow ? this.state.flow : ''}           onChange={this.setFlow}
                />
              <small className="grey">3 - 200 gpm</small>
              {isNaN(this.state.flow) && (<p style={errorMsg}>Flow should be a number between 3-200 with no commas.</p>)}
            </div>
            {/* PIPE SIZE */}
            <div className="tab-row bg-lt-grey">
              <label className="even-120">Pipe Size</label>
                <input
                  type="text"
                  name="pipeSize"
                  value={this.state.pipeSize ? this.state.pipeSize : ''}           onChange={this.setPipeSize}
                />
              <small className="grey">6 - 72 in.</small>
              {isNaN(this.state.pipeSize) && (<p style={errorMsg}>Pipe size should be a number between 6-72 with no commas. If working on larger diameter pipe, please include details in the Notes section.</p>)}
            </div>
            {/* ROTATION */}
            <div className="tab-row">
              <label className="even-120">Rotation Speed</label>
                <select id="rotation" defaultValue={this.state.rotation} onChange={this.setRotation}>
                <option value='Slow'>Slow</option>
                <option value='Fast'>Fast</option>
                </select>
            </div> 
            {/* INLET */}
            <div className="tab-row bg-lt-grey">
              <label className="even-120">Inlet Connection</label>
              <select id="inlet" defaultValue={this.state.inlet} onChange={this.setInlet}>
              <option value='1 NPT'>1 NPT</option>
              <option value='3/4 NPT'>3/4 NPT</option>
              <option value='M24'>M24</option>
              <option value='3/4 MP'>3/4 MP</option>
              <option value='9/16 HP'>9/16 HP</option>
              </select>
            </div>
            {/* HOSE SIZE */}
            <div className="tab-row">
              <label htmlFor="hoseSize" className="even-120"> Hose Size</label>
              <select id="hoseSize" defaultValue={this.state.hoseSize} onChange={this.setHoseSize}>
              <option value="4 mm">4 mm</option>
              <option value="3/16 in.">3/16 in.</option>
              <option value="5 mm">5 mm</option>
              <option value="6 mm">6 mm</option>
              <option value="1/4 in.">1/4 in.</option>
              <option value="8 mm">8 mm</option>
              <option value="3/8 in.">3/8 in.</option>
              <option value="1/2 in.">1/2 in.</option>
              <option value="13 mm">13 mm</option>
              <option value="5/8 in.">5/8 in.</option>
              <option value="3/4 in.">3/4 in.</option>
              <option value="20 mm">20 mm</option>
              <option value="25 mm">25 mm</option>
              <option value="1 in.">1 in.</option>
              <option value="1 1/4 in.">1 1/4 in.</option>
              <option value="32 mm">32 mm</option>
              </select>
            </div>
            {/* HOSE LENGTH */}
            <div className="tab-row bg-lt-grey">
              <label className="even-120">Hose Length</label>
                <input
                  type="text"
                  name="hoseLength"
                  value={this.state.hoseLength ? this.state.hoseLength : ''}           onChange={this.setHoseLength}
                />
              <small className="grey">30 - 1000 ft</small>
              {isNaN(this.state.hoseLength) && (<p style={errorMsg}>Hose length should be a number between 3-1000 with no commas.</p>)}
            </div> 

            <div className="prev-next">
              <button onClick={this.changeTab.bind(null, 2)} className="pull-right btn btn-gray">Next: Head Selection</button>
            </div>
          </div>
        )}
        
        {/* TAB 2 CONTENT */}
        {tab === 2 && (
          <div className="tab-content">
            {/* HEAD TYPE 
            If [Pressure, Flow, Inlet, Rotation], set swivel=something. Then, based on swivel, display appropriate head choices. 
            */}
            <div className="tab-row bg-lt-grey">
              <label htmlFor="headType" className="even">Head Type:</label>
              <select id="headType" defaultValue={this.state.headType} onChange={this.setHoseSize}>
                {this.state.pressure >= 2000 && this.state.pressure <= 10000 && this.state.inlet === '1 NPT' && <option>Option A</option>}
          
                {/* Throws key warning */}
                {this.state.hoseSize === '8 mm' && [
                  <option>Option B</option>,
                  <option>Option B</option>
                ]}
          
                {this.state.pressure < 2000 && (
                  <optgroup>
                    <option>Option C</option>
                    <option>Option C</option>
                  </optgroup>
                )}

              </select>
            </div>
            <div className="prev-next">
              <button onClick={this.changeTab.bind(null, 1)} className="pull-left btn btn-gray">Previous</button>
              <button onClick={this.changeTab.bind(null, 3)} className="pull-right btn btn-gray">Next: Options</button>
            </div>
              
          </div>
        )}

        {/* TAB 3 CONTENT */}
        {tab === 3 && (
          <div className="tab-content">
            <div className="tab-row">
              <label>Add instructions or other info:</label>
                <textarea
                  type="text"
                  name="notes"
                  value={this.state.value}           onChange={this.setNotes}
                  className="msg-box"
                />
            </div>
            <div className="prev-next">
              <button onClick={this.changeTab.bind(null, 2)} className="pull-left btn btn-gray">Previous</button>
              <button onClick={this.changeTab.bind(null, 4)} className="pull-right btn btn-gray">Next: Notes</button>
            </div>
          </div>
        )}
        
        {/* TAB 4 CONTENT */}
        {tab === 4 && (
          <div className="tab-content">
            <div className="tab-row">
              <label>Add instructions or other info:</label>
                <textarea
                  type="text"
                  name="notes"
                  value={this.state.value}           onChange={this.setNotes}
                  className="msg-box"
                />
            </div>
            <div className="prev-next">
              <button onClick={this.changeTab.bind(null, 2)} className="pull-left btn btn-gray">Previous</button>
              <button onClick={this.changeTab.bind(null, 5)} className="pull-right btn btn-gray">Next: Summary</button>
            </div>
          </div>
        )}

        {/* TAB 5 CONTENT */}
        {tab === 5 && (
          <div className="tab-content">
            <div className="tab-row">
              <div className="col-sm-6">
                <h2>Parameters</h2>
                Pressure: {this.state.pressure}<br/>
                Flow: {this.state.flow}<br/>
                Pipe Size: {this.state.pipeSize}<br/>
                Rotation Speed: {this.state.rotation}<br/>
                Inlet Connection: {this.state.inlet}<br/>
                Hose Size: {this.state.hoseSize}<br/>
                Hose Length: {this.state.hoseLength}<br/><hr/>
                Swivel: <br/>
                
                
                {this.state.flange ? 'Flange: true' : 'Flange: false'}<br/>
                {!this.state.flange && this.state.plate ? 'Plate: true' : 'Plate: false'}
              </div>
              <div className="col-sm-6">
                <h2>Optional Items</h2>
                Add Hose: {this.state.addHose}<br/>
                Add Collet: {this.state.addCollet}<br/>
                Add Roller: {this.state.addRoller ? 'PRO 174-46' : 'false'}<br/>
                Add Flange Mount: {this.state.addFlangeMount ? 'BOP 010-4-8' : 'false'}<br/>
                Add Strap Mount: {this.state.addStrapMount ? 'BOP 050' : 'false'}<br/>
                Add Nozzle: {this.state.addNozzle}<br/>
                Notes: {this.state.notes}
          
              </div>
              <br className="clearfix"/>
            </div>
            <div className="prev-next">
              
              {!this.state.done && <button onClick={this.changeTab.bind(null, 4)} className="pull-left btn btn-gray">Previous</button>}
        
              {!this.state.done && <input type="button" value="Get a Quote" onClick={this.updateRadio.bind(null, {done: true})} className="pull-right btn" />}

              {this.state.done && (
                <div>
                  <div className="tab-row">
                    <h2>Customer Contact Information</h2>
                  </div>
                  <form action="https://formspree.io/margaret.babiarz@stoneagetools.com"
          method="POST" className="send-form">
                    <div className="col-sm-6">
                      <input type="text" name="Name: " placeholder="Your Name" className="wide pull-right"/><br/>
                      <input type="text" name="Company: " placeholder="Company Name" className="wide pull-right"/>
                    </div>
                    <div className="col-sm-6">
                      <input type="email" name="Email: " placeholder="Email Address" className="wide pull-right"/><br/>
                      <input type="text" name="Phone: " placeholder="Phone Number" className="wide pull-right"/>

                      <input type="submit" className="btn pull-right" value="Send"/>
                    </div>
                    <br className="clearfix" />
                    <input type="hidden" name="_subject" value="Navigator Quote Request" />
                    <input type="hidden" name="Pipe Size: " value={this.state.pipeSize} />
                    <input type="hidden" name="Hose Size: " value={this.state.hoseSize} />
                    <input type="hidden" name="Flange: " value={this.state.flange} />
                    <input type="hidden" name="Splash Plate: " value={this.state.plate} className="hidden" />
                    <input type="hidden" name="Hose: " value={this.state.addHose} className="hidden" />
                    <input type="hidden" name="Collet: " value={this.state.addCollet} className="hidden" />
                    <input type="hidden" name="Roller: " value={this.state.addRoller} className="hidden" />
                    <input type="hidden" name="Flange Mount: " value={this.state.addFlangeMount} className="hidden" />
                    <input type="hidden" name="Strap Mount: " value={this.state.addStrapMount} className="hidden" />
                    <input type="hidden" name="Nozzle: " value={this.state.addNozzle} className="hidden" />
                    <input type="hidden" name="Notes: " value={this.state.notes} className="hidden" />
                    <input type="hidden" name="_next" value="http://www.stoneagetools.com/email-thanks.html" />
                  </form>
                </div>
              )}
              
            </div>
          </div>
        )}
      
      </div>
    );
  }
});
 
ReactDOM.render(<App />, document.querySelector('#appContent'));