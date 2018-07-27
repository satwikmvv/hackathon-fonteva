import React, { Component } from 'react';
import './assets/bootswatch.min.css';
import './App.css';
import cartdata from './assets/data.json';
import CardDisplay from './components/CardDisplay';


class App extends Component {
  constructor(props) {
    super(props);

    this.state={
      selectVal: "name",
      color:"",
      material: "",
      name: "",
      price: "",
      showData: false
    }
    this.handleChange=this.handleChange.bind(this);
    this.selectChange=this.selectChange.bind(this);
    this.handleSearch=this.handleSearch.bind(this)
  }

  componentWillMount() {
    // fetch('https://s3.us-west-2.amazonaws.com/secure.notion-static.com/9e212fa6-b995-405e-8fdf-49b77e6f68e2/data.json?AWSAccessKeyId=AKIAJLJXUMP5IHUZAPFQ&Expires=1532732109&Signature=Q%2FK%2FEhjVaY8TUnm37wv%2BWfBGtsk%3D')
    // .then(res=>res.json())
    // .then(x=>console.log(x))
    console.log(cartdata);
  }
 
  handleChange=(e)=>{
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handlePageClick = (data) => {
    let selected = data.selected;
    let offset = Math.ceil(selected * 10);
  }

  selectChange=(e)=>{
    this.setState({
      selectVal: e.target.value,
      color:'',
      material:'',
      name:'',
      price:'',
      showData:false
    })
  }

  handleSearch() {
    this.setState({
      showData:true
    })
  }


  render() {
    return (
      <div className="App">
        <div className="Form-header container-fluid">
          <div className='row title'>            
            <h1>Cart</h1>
          </div>
          <div className='row searchinput justify-content-between'>
            <div className='inputcol col-xs-12 col-sm-12 col-md-6 col-lg-5 col-xl-4'>
              <input type='text' placeholder={`search using ${this.state.selectVal}`} onChange={this.handleChange} name={this.state.selectVal} value={this.state[this.state.selectVal]}/>
              <a href="#" onClick={this.handleSearch}>Search</a>
            </div>
            <div className='selectcol col-xs-12 col-sm-12 col-md-4 col-lg-3 col-xl-2'>
              <select id='fieldSelect' onChange={this.selectChange} value={this.state.selectVal} >
                <option value='name'>Name</option>
                <option value='color'>Color</option>
                <option value='material'>Material</option>
                <option value='price'>Price</option>
              </select>
            </div>
          </div>
        </div>

        <section className="container-fluid">
          <div className="row">
          {
            (this.state.showData)
            ?
            
            (
              cartdata
              .filter(x=>x[this.state.selectVal].toLowerCase().includes(this.state[this.state.selectVal])).slice(0,10)
              .map(data=>{
                return(
                  <CardDisplay key={data.id} data={data} />
                )}
              )
          )
          : <h1>Search Items in SearchBar</h1>

          }

          </div>
        </section>

      </div>
    );
  }
}

export default App;
