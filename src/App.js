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
      name: "",
      price: "",
      showData: false,
      pageindex:0
    }
    this.handleChange=this.handleChange.bind(this);
    this.selectChange=this.selectChange.bind(this);
    this.handleSearch=this.handleSearch.bind(this);
    this.nextPage=this.nextPage.bind(this);
    this.prevPage=this.prevPage.bind(this);
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


  selectChange=(e)=>{
    this.setState({
      selectVal: e.target.value,
      name:'',
      price:'',
      showData:false,
      pageindex:0
    })
  }

  handleSearch() {
    this.setState({
      showData:true,
      pageindex:0
    })
  }

  nextPage() {
    this.setState((prevState)=>({
      pageindex:prevState.pageindex+8
    }))
  }
  
  prevPage() {
    this.setState((prevState)=>({
      pageindex:prevState.pageindex-8
    }))
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
            </div>
            <a href="#" onClick={this.handleSearch} className='button' >Search</a>
            <div className='selectcol col-xs-12 col-sm-12 col-md-4 col-lg-3 col-xl-2'>
              <select id='fieldSelect' onChange={this.selectChange} value={this.state.selectVal} >
                <option value='name'>Name</option>
                <option value='price'>Price</option>
              </select>
            </div>
          </div>
        </div>

        <section className="container-fluid">
              {/* Page navigation */}
          <div className='pagenav'>
              {/* Not rendering prev page button on the first page */}
            {(this.state.pageindex!==0)&& <a href="#" onClick={this.prevPage}>Prev Page</a>}  

            <a href="#" onClick={this.nextPage}>Next Page</a>
          </div>
          
          {/* Showing number of records */}
          {(this.state.showData)
            ? 
              <h1>{cartdata
                .filter(x=>x[this.state.selectVal].toLowerCase().includes(this.state[this.state.selectVal])).length} entries - ({this.state.pageindex+1} - {this.state.pageindex+8})</h1>
            :
              <h1>{cartdata.length} entries - ({this.state.pageindex+1} - {this.state.pageindex+8})</h1>
          }

          <div className="row">
            {
              (this.state.showData)
              ? 
                cartdata
                .filter(x=>x[this.state.selectVal].toLowerCase().includes(this.state[this.state.selectVal]))
                .slice(this.state.pageindex,this.state.pageindex+8)
                .map(data=>{
                  return(
                    <CardDisplay key={data.id} data={data} />
                  )}
                )
            
              : cartdata
                .slice(this.state.pageindex,this.state.pageindex+8)
                .map(data=>{
                  return(
                    <CardDisplay key={data.id} data={data} />
                  )}
                )

            }
          </div>
        </section>

      </div>
    );
  }
}

export default App;
