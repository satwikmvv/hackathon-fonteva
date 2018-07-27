import React,{Component} from 'react';

class CardDisplay extends Component  {
  
      render(){
        return (
            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3" data={this.props.data}>
                <div className="card" >
                  <h4 className="card-header">{this.props.data.name}</h4>
                  <div className="card-body">
                    <h5 className="card-title">Price:{this.props.data.price}</h5>
                    <h6 className="card-subtitle text-muted">description:{this.props.data.description}</h6>
                  </div>
                  <img className="pokeimg" src={this.props.data.image} alt={this.props.data.name} />
                </div>
            </div>
        );
      }
}

export default CardDisplay;