const App = React.createClass({
  getInitialState: function () {
    return {
      pressure: 0,
      flow: 0,
      pipeSize: 0,
      rotation: 'Slow',
      inlet: '1 NPT',
      swivel: '',
      hoseSize: '4 mm',
      hoseLength: 0,
      headType: '6-Port',
      portSize: '',
      backout: true,
      cSkid: false,
      cCage: false,
      c6Wheel: false,
      c8Wheel: false,
      ring: false,
      case: false,
      kService: false,
      kSeal: false,
      kOverhaul: false,
      kTool: false,
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
  
  toggleValue: function (event) {
    var val = event.currentTarget;
    var newVal = {};
    newVal[val.id] = val.checked;
    this.setState(newVal);
  },
  
  handleChecks: function (event) {
    var checkbox = event.currentTarget;
    console.log(checkbox);
    var newVal = {};
    newVal[val.id] = val.checked;
    this.setState(newVal);
  },
  
  toggleVisibility: function (id) {
     var e = document.getElementById(id);
     if(e.style.display == 'block')
        e.style.display = 'none';
     else
        e.style.display = 'block';
  },

  updateValue: function(key) {
    var update = {};
    update[key] = this.refs[key].value;
    this.setState(update);
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
  
  setHeadType: function(e) {
    this.setState({ headType: e.target.value });
  },
  
  setPortSize: function(e) {
    this.setState({ portSize: e.target.value });
  },
  
  setNotes: function(e) {
    this.setState({ notes: e.target.value });
  },
  
  getSwivel: function () {
    var p = this.state.pressure;
    var f = this.state.flow;
    var i = this.state.inlet;
    var r = this.state.rotation;
    
    var swivels = ['BJV-P16-S', 'BJV-P16-F', 'BJV-P12-S', 'BJV-P12-F', 'BJV-M24-S', 'BJV-M24-F', 'BJV-MP12-S', 'BJV-MP12-F', 'BJV-H9-S', 'BJV-H9-F'];
    var p16logic = p >= 2000 && p <= 10000 && f >= 20 && f <= 200 && i === '1 NPT';
    var p12logic = p >= 2000 && p <= 15000 && f >= 12 && f <= 100 && i === '3/4 NPT';
    var m24logic = p >= 2000 && p <= 22000 && f >= 12 && f <= 100 && i === 'M24';
    var mp12logic = p >= 2000 && p <= 22000 && f >= 10 && f <= 60 && i === '3/4 MP';
    var h9logic = p >= 20000 && p <= 40000 && f >= 3 && f <= 20 && i === '9/16 HP';
    if (p16logic && r === 'Slow') { return swivels[0]; }
    if (p16logic && r === 'Fast') { return swivels[1]; }
    if (p12logic && r === 'Slow') { return swivels[2]; }
    if (p12logic && r === 'Fast') { return swivels[3]; }
    if (m24logic && r === 'Slow') { return swivels[4]; }
    if (m24logic && r === 'Fast') { return swivels[5]; }
    if (mp12logic && r === 'Slow') { return swivels[6]; }
    if (mp12logic && r === 'Fast') { return swivels[7]; }
    if (h9logic && r === 'Slow') { return swivels[8]; }
    if (h9logic && r === 'Fast') { return swivels[9]; }
    
    return <span style={{color:'#c45846',fontSize:'12px',fontStyle:'italic'}}>No swivel found for this configuration</span>;
  },
                              
  getDefaultPortSize: function (swivel) {
    var ps = this.state.portSize;
    if (swivel === 'BJV-P16-S' || swivel === 'BJV-P16-F') { ps = "P12" }
    if (swivel === 'BJV-P12-S' || swivel === 'BJV-P12-F' || swivel === 'BJV-M24-S' || swivel === 'BJV-M24-F' || swivel === 'BJV-MP12-S' || swivel === 'BJV-MP12-F') { ps = "P4" }
    if (swivel === 'BJV-H9-S' || swivel === 'BJV-H9-F') { ps = "S6" }
  
    return ps;
  },
  
  render() {
    var styleInline = { display:'inline' };
    var errorMsg = { color:'#c45846', margin:0, fontSize:'12px', fontStyle:'italic' };
    var infoMsg = { color:'#888', margin:'10px', fontSize:'12px', fontStyle:'italic', display:'none' };
    var tab = this.state.tab;
    var swivel = this.getSwivel();
    var portSize = this.getDefaultPortSize(swivel);
    
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
                  ref="pressure"
                  type="text"
                  name="pressure"
                  value={this.state.pressure ? this.state.pressure : ''}           onChange={this.updateValue.bind(null, 'pressure')}
                />
              <small className="grey">2000 - 40000 psi</small>
              {isNaN(this.state.pressure) && (<p style={errorMsg}>Pressure should be a number between 2000-40000 with no commas.</p>)}
            </div>     
            {/* FLOW */}
            <div className="tab-row">
              <label className="even-120">Operating Flow</label>
                <input
                  ref="flow"
                  type="text"
                  name="flow"
                  value={this.state.flow ? this.state.flow : ''} 
                  onChange={this.updateValue.bind(null, 'flow')}
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
                  value={this.state.pipeSize ? this.state.pipeSize : ''}           onChange={this.updateValue.bind(null, 'pipeSize')}
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
            If [Pressure, Flow, Inlet, Rotation], set swivel=something. Then, based on swivel, display appropriate head choices. OR try fitting that login into getSwivel()!
            */}
            <div className="tab-row">
              Swivel: {swivel}
              {/* NOT WORKING WITH MULTIPLE CONDITIONS...? Refactor: Try creating headType function that contains logic and using it here */}
            </div>
            <div className="tab-row bg-lt-grey">
          
              {swivel === 'BJV-P16-S' && (
              <div>
                
                <label htmlFor="portSize" className="even">Head Type: </label>  <select id="headType" defaultValue={this.state.headType} onChange={this.setHeadType}>
                  <option>6-Port</option>
                </select>
                <label htmlFor="portSize" className="even" style={{marginLeft:'40px'}}>Port Size: </label>
                <select id="portSize" defaultValue={portSize} onChange={this.setPortSize}>
                  <option>{this.getDefaultPortSize(swivel)}</option>
                  <option>P8</option>
                </select> <button className="pull-right" onClick={this.toggleVisibility.bind(null, 'backoutTip')}>?</button>
                <div id="backoutTip" className="media" style={infoMsg}>
                  <div className="media-body">
                    <p>The standard head configuration for this swivel is:<br/> 6-port with extensions.</p>
                    <p>Extensions will be selected for pipe size specified.</p>
                    <p>Custom heads are available. Please specify additional instructions in the Notes section.</p>
                  </div>
                  <span className="media-right">
                      <img src="http://www.stoneagetools.com/assets/img/product/thumb-bjv-05.jpg" alt="..." />
                  </span>
                </div>
          
              </div>
              )}
          
              {swivel === 'BJV-P12-S' && (
              <div>
                <label htmlFor="headType" className="even">Head Type: </label>
                <select id="headType" defaultValue={this.state.headType} onChange={this.setHeadType}>
                  <optgroup>
                    <option>6-Port</option>
                    <option>7-Port</option>
                  </optgroup>
                </select>
                <label htmlFor="portSize" className="even" style={{marginLeft:'21px'}}>Port Size: </label>
                <select id="portSize" defaultValue={this.state.portSize} onChange={this.setPortSize}>
                  <optgroup>
                    <option>P12</option>
                    <option>P8</option>
                  </optgroup>
                </select>
              </div>
              )}

              {swivel === 'BJV-P-S' && (
                <div>
                <label htmlFor="headType" className="even">Head Type: </label>
                <select id="headType" defaultValue={this.state.headType} onChange={this.setHeadType}>
                  <optgroup>
                    <option>6-Port</option>
                    <option>7-Port</option>
                  </optgroup>
                </select>
                <select id="portSize" defaultValue={this.state.portSize} onChange={this.setPortSize}>
                  <optgroup>
                    <option>P6</option>
                    <option>P8</option>
                  </optgroup>
                </select>
              </div>
              )}

              
              
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
            {/* ADD BACKOUT */}
            <div className="tab-row bg-lt-grey">
              <input id="backout" defaultChecked={this.state.backout} type="checkbox" onChange={this.toggleValue}/>
              <label htmlFor="backout"> Add Backout Preventer</label> <button className="pull-right" onClick={this.toggleVisibility.bind(null, 'backoutTip')}>?</button>
              <div id="backoutTip" className="media" style={infoMsg}>
                <div className="media-body">
                  <p>Backout preventers increase operator safety by keeping the tool from backing out of the pipe.</p>
                  <p>Options are available including fixtures for small diameter pipes, pipes with various flange bolt circle diameters, and adapters for pipes with no-flange entry.</p>
                  <p>The appropriate backout preventer will be selected based on your parameters. Include additional instructions in Notes.</p>
                  <p><a href="http://www.stoneagetools.com/backout-prevention" target="_blank">See our backout prevention product page for details.</a></p>
                </div>
                <span className="media-right">
                    <img src="http://www.stoneagetools.com/assets/img/product/thumb-backout-305.jpg" alt="..." />
                </span>
              </div>
            </div>
          
            {/* ADD CENTRALIZER */}
            <div className="tab-row">
              Add Centralizer <button className="pull-right" onClick={this.toggleVisibility.bind(null, 'cTip')}>?</button>
              <input id="cSkid" defaultChecked={this.state.cSkid} type="checkbox" onChange={this.toggleValue}/>
              <label htmlFor="cSkid"> Skid Style</label> 
              
              <input id="cCage" defaultChecked={this.state.cCage} type="checkbox" onChange={this.toggleValue}/>
              <label htmlFor="cCage"> Cage Style</label>
              
              <input id="c6Wheel" defaultChecked={this.state.c6Wheel} type="checkbox" onChange={this.toggleValue}/>
              <label htmlFor="c6Wheel"> 6-Wheel</label>
              
              <input id="c8Wheel" defaultChecked={this.state.c8Wheel} type="checkbox" onChange={this.toggleValue}/>
              <label htmlFor="c8Wheel"> 8-Wheel</label>
              <div id="cTip" className="media" style={infoMsg}>
                <div className="media-body">
                  <p>A centralizer helps to protect the tool as it passes through the pipe and balances jet standoff distance for more consistent cleaning.</p>
                  <p>In cases where pipe size is more than 1.5 times the diameter of the tool, a centralizer is an important safety device, preventing the tool from turning around and thrusting backwards out of the pipe.</p>
                  <p><a href="http://www.stoneagetools.com/bjv-centralizers" target="_blank">See our centralizer product page for details.</a></p>
                </div>
                <span className="media-right">
                  <img src="http://www.stoneagetools.com/assets/img/product/thumb-bjv-centralizer-02.jpg" />
                </span>
              </div> 
            </div>
            
            {/* ADD PULLING RING */}
            <div className="tab-row bg-lt-grey">
              <input id="ring" defaultChecked={this.state.ring} type="checkbox" onChange={this.toggleValue}/>
              <label htmlFor="ring"> Add Pulling Ring</label> <button className="pull-right" onClick={this.toggleVisibility.bind(null, 'ringTip')}>?</button>
              <div id="ringTip" className="media" style={infoMsg}>
                <div className="media-body">
                  <p>A pulling ring can be utilized to pull a tool through the pipe in difficult cleaning applications. Pulling rings are available for 6-port and 8-port BJV heads.</p>
                </div>
                {/*<span className="media-right">
                    <img src="http://www.stoneagetools.com/assets/img/product/thumb-backout-305.jpg" alt="..." />
                </span>*/}
              </div>
            </div>
                    
            {/* ADD CASE */}
            <div className="tab-row">
              <input id="ring" defaultChecked={this.state.case} type="checkbox" onChange={this.toggleValue}/>
              <label htmlFor="case"> Add Carrying Case</label> <button className="pull-right" onClick={this.toggleVisibility.bind(null, 'caseTip')}>?</button>
              <div id="caseTip" className="media" style={infoMsg}>
                <div className="media-body">
                  <p>A Pelican&trade; protection/carrying case with custom cut foam insert is available for BJV tools.</p>
                </div>
                {/*<span className="media-right">
                    <img src="http://www.stoneagetools.com/assets/img/product/thumb-backout-305.jpg" alt="..." />
                </span>*/}
              </div>
            </div>
                    
            {/* ADD MAINT KIT */}
            <div className="tab-row bg-lt-grey">
              Add Maintenance Kit <button className="pull-right" onClick={this.toggleVisibility.bind(null, 'maintTip')}>?</button>
              <input id="cSkid" defaultChecked={this.state.cSkid} type="checkbox" onChange={this.toggleValue}/>
              <label htmlFor="cSkid"> Service Kit</label> 
              
              <input id="cCage" defaultChecked={this.state.cCage} type="checkbox" onChange={this.toggleValue}/>
              <label htmlFor="cCage"> Seal Kit</label>
              
              <input id="c6" defaultChecked={this.state.cCage} type="checkbox" onChange={this.toggleValue}/>
              <label htmlFor="c6"> Overhaul Kit</label>
              
              <input id="c8" defaultChecked={this.state.cCage} type="checkbox" onChange={this.toggleValue}/>
              <label htmlFor="c8"> Tool Kit</label>
              <div id="maintTip" className="media" style={infoMsg}>
                <p>Maintenance kits should be listed somewhere on the website</p>
                <p><a href="#" target="_blank">Where are they listed?</a></p>
              </div> 
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
                  value={this.state.notes}           onChange={this.setNotes}
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
                Swivel: {this.getSwivel()}<br/>
                {swivel.type !== 'span' && (
                  <div>
                Head Type: {this.state.headType}<br/>
                Port Size: {this.state.portSize}
                  </div>
                )}
              </div>
              <div className="col-sm-6">
                <h2>Optional Items</h2>
                Backout Preventer: {this.state.backout ? 'true' : 'false'}<br/>
                Centralizer: {this.state.cSkid ? 'BJ 070' : ''} {this.state.cCage ? 'Cage' : ''} {this.state.c6Wheel ? 'BJ 286' : ''}{this.state.c8Wheel ? 'BJ 288' : ''}{!this.state.cSkid && !this.state.cCage && !this.state.c6Wheel && !this.state.c8Wheel && 'false'}<br/>
                Pulling ring: {this.state.ring ? 'HC 090' : 'false'}<br/>
                Carrying Case: {this.state.addFlangeMount ? 'BJ 080' : 'false'}<br/>
                Maintenance Kit: {this.state.kService ? 'BJ 600' : ''} {this.state.kSeal ? 'BJ 602' : ''} {this.state.kOverhaul ? 'BJ 610' : ''} {this.state.kTool ? 'BJ 612' : ''}{!this.state.kService && !this.state.kSeal && !this.state.kOverhaul && !this.state.kTool && 'false'}<br/>
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