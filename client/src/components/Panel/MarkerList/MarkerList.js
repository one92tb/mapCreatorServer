import React, {Component} from 'react';
import './markerList.css';
import {ListGroup, ListGroupItem} from 'reactstrap';

class MarkerList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedId: ''
    };

    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(id) {
    if (id === this.state.selectedId) {
      id = '';
      this.setState({selectedId: id})
    } else {
      this.setState({selectedId: id})
    }
  }

  render() {

    const initData = [
      {
        name: 'Home',
        icon: 'icon-home'
      }, {
        name: 'Football Pitch',
        icon: 'icon-soccer-ball'
      }
    ]

    const {selectedId} = this.state;

    return (<ul className="markerList">
      {
        initData.map((marker, id) => (<li key={id} className={`markerBox ${ (selectedId === id)
            ? 'selectedMarker'
            : ''}`} onClick={() => this.onSelect(id)}>
          <div className="markerBox__name">
            <span>{marker.name}</span>
          </div>
          <div className="markerBox__icon">
            <i className={marker.icon}></i>
          </div>
        </li>))
      }
    </ul>);
  }
}

export default MarkerList;
