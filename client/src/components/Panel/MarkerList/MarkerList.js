import React, {Component} from 'react';
import './markerList.css';
import {ListGroup, ListGroupItem} from 'reactstrap';
import {fetchMarkerRecord} from '../../../actions/fetchMarkerRecord';
import {connect} from 'react-redux';

class MarkerList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedId: ''
    };

    this.onSelect = this.onSelect.bind(this);
  }

  componentDidMount(){
    this.props.fetchMarkerRecord();
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
    console.log(this.props);
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
        this.props.records.map((marker, id) => (<li key={id} className={`markerBox ${ (selectedId === id)
            ? 'selectedMarker'
            : ''}`} onClick={() => this.onSelect(id)}>
          <div className="markerBox__name">
            <span>{marker.name}</span>
          </div>
          <div className="markerBox__icon">
            <img src={`http://localhost:8080/images/${marker.icon}`} alt={marker.icon} />
          </div>
        </li>))
      }
    </ul>);
  }
}
const mapStateToProps = (state) => ({
  records: state.marker.records
})

const mapDispatchToProps = {
  fetchMarkerRecord
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkerList);
