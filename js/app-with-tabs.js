const Tabs = React.createClass({
  displayName: 'Tabs',
  propTypes: {
    selected: React.PropTypes.number,
    children: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.element
    ]).isRequired
  },
  getDefaultProps() {
    return {
      selected: 0
    };
  },
  getInitialState() {
    return {
      selected: this.props.selected
    };
  },
  handleClick(index, event) {
    event.preventDefault();
    this.setState({
      selected: index
    });
  },
  _renderTitles() {
    function labels(child, index) {
      let activeClass = (this.state.selected === index ? 'active' : '');
      return (
        <li key={index}>
          <a href="#" 
            className={activeClass}
            onClick={this.handleClick.bind(this, index)}>
            {child.props.label}
          </a>
        </li>
      );
    }
    return (
      <ul className="tabs__labels">
        {this.props.children.map(labels.bind(this))}
      </ul>
    );
  },
  _renderContent() {
    return (
      <div className="tabs__content">
        {this.props.children[this.state.selected]}
      </div>
    );
  },
  render() {
    return (
      <div className="tabs">
        {this._renderTitles()}
        {this._renderContent()}
      </div>
    );
  }
});

const Pane = React.createClass({
  displayName: 'Pane',
  propTypes: {
    label: React.PropTypes.string.isRequired,
    children: React.PropTypes.element.isRequired
  },
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});

const App = React.createClass({
  getInitialState: function () {
    return {
      liked: false,
      pipeSize: '2 in.',
      hoseSize: '4/4',
      flange: true,
      plate: true,
      addHose: 'no',
      addCollet: 'no',
      addRoller: false,
      addFlangeMount: false,
      addStrapMount: false,
      addNozzle: 'no',
      notes: '',
      done: false,
    };
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
  setPipeSize: function(e) {
    this.setState({ pipeSize: e.target.value });
  },
  
  setHoseSize: function(e) {
    this.setState({ hoseSize: e.target.value });
  },
  
  setAddHose: function(e) {
    this.setState({ addHose: e.target.value });
  },
  
  setAddCollet: function(e) {
    this.setState({ addCollet: e.target.value });
  },
  
  setAddNozzle: function(e) {
    this.setState({ addNozzle: e.target.value });
  },
  
  
  setNotes: function(e) {
    this.setState({ notes: e.target.value });
  },
  
  render() {
    var styleInline = { display:'inline' };
    
    return (
      <div>
      
        <h2>Configure your equipment</h2>
      
        <Tabs selected={0}>
          <Pane label="1. Parameters">
            <div>
              {/* PIPE SIZE */}
              <div>
                <label htmlFor="pipeSize" className="even">Pipe Size</label>
                <select id="pipeSize" defaultValue={this.state.pipeSize} onChange={this.setPipeSize}>
                <option value='2 in.'>2 in.</option>
                <option value='2.5 in.'>2.5 in.</option>
                <option value='3 in.'>3 in.</option>
                <option value='4 in.'>4 in.</option>
                </select>
              </div>
      
              {/* HOSE SIZE */}
              <div>
                <label htmlFor="hoseSize" className="even"> Hose Size</label>
                <select id="hoseSize" defaultValue={this.state.hoseSize} onChange={this.setHoseSize}>
                <option value="4/4">4/4</option>
                <option value="5/4">5/4</option>
                <option value="6/4">6/4</option>
                </select>
              </div>
          
              {/* FLANGE */}
              <div>
                <p style={styleInline}>Does the pipe have a flange?</p>
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
      
            </div>
          </Pane>
            
          <Pane label="2. Options">
            <div>
              {/* ADD HOSE */}
              <div>
                <label htmlFor="addHose" className="even">Add Hose</label>
                <select id="addHose" defaultValue={this.state.addHose} onChange={this.setAddHose}>
                <option value='None'>None</option>
                <option value='75 ft'>75 ft</option>
                <option value='100 ft'>100 ft</option>
                </select>
              </div>
                
              {/* ADD COLLET */}
              <div>
                <label htmlFor="addCollet" className="even">Add Collet</label>
                <select id="hoseKit" defaultValue={this.state.addCollet} onChange={this.setAddCollet}>
                <option value='None'>None</option>
                <option value='FF 121-438'> Single, .438</option>
                <option value='FF 121-460'>Single, .460</option>
                <option value='FF 121-484'>Single, .484</option>
                <option value='FF 121-516'>Single, .516</option>
                <option value='NAV 621'>Kit,  .438–.516</option>
                </select>
              </div>
              
              {/* ADD NOZZLE */}
              <div>
                <label htmlFor="addNozzle" className="even">Add Nozzle </label>
                <select id="addNozzle" defaultValue={this.state.addNozzle} onChange={this.setAddNozzle}>
                <option value='None'>None</option>
                <option value='BT25-MP6R-C'>Banshee, 22k psi (12-15 gpm)</option>
                <option value='BT25-MP6R-A'>Banshee, 22k psi (13-20 gpm)</option>
                </select>
              </div>
                
              {/* ADD OTHER */}
              <div>
                <h3>Other Options</h3>
                <input id="addRoller" defaultChecked={this.state.addRoller} type="checkbox" onChange={this.toggleValue}/>
                <label htmlFor="addRoller"> Roller, .460</label><br/>
                
                <input id="addFlangeMount" defaultChecked={this.state.addFlangeMount} type="checkbox" onChange={this.toggleValue}/>
                <label htmlFor="addFlangeMount"> Flange Mount Base Plate Assembly</label><br/>
                
                <input id="addStrapMount" defaultChecked={this.state.addStrapMount} type="checkbox" onChange={this.toggleValue}/>
                <label htmlFor="addStrapMount"> Strap Mount Assembly</label><br/>
                
              </div>
                
            </div>
          </Pane>
                
          <Pane label="3. Notes">
            <p>Add instructions or other info:</p>
            <textarea
              type="text"
              name="notes"
              value={this.state.value}           onChange={this.setNotes}
            />
          </Pane>
            
          <Pane label="4. Summary">
            <div>
              <h2>Parameters</h2>
              Pipe Size: {this.state.pipeSize}<br/>
              Hose Size: {this.state.hoseSize}<br/>{this.state.flange ? 'Flange: yes' : 'Flange: no'}<br/>
              {!this.state.flange && this.state.plate ? 'Plate: yes' : 'Plate: no'}<br/>
              <h2>Optional Items</h2>
              Add Hose: {this.state.addHose}<br/>
              Add Collet: {this.state.addCollet}<br/>
              Add Roller: {this.state.addRoller ? 'PRO 174-46' : 'no'}<br/>
              Add Flange Mount: {this.state.addFlangeMount ? 'BOP 010-4-8' : 'no'}<br/>
              Add Strap Mount: {this.state.addStrapMount ? 'BOP 050' : 'no'}<br/>
              Add Nozzle: {this.state.addNozzle}<br/>
              Notes: {this.state.notes}
            </div>
          </Pane>
        </Tabs>
      
      </div>
    );
  }
});
 
ReactDOM.render(<App />, document.querySelector('#appContent'));