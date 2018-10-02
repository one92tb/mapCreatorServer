import React, {Component} from 'react';
import './markerList.css';
import {fetchRecords} from '../../../actions/fetchRecords';
import {getSelectedMarker} from '../../../actions/getSelectedMarker';
import {connect} from 'react-redux';

class MarkerList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedId: ''
    };
  }

  componentDidMount() {
    this.props.fetchRecords();
  }

  onSelect = (marker, id) => {

    if (id === this.state.selectedId) {
      id = '';
      marker = null;
      this.setState({selectedId: id})
    } else {
      this.setState({selectedId: id})
    }

    const getSelectedMarker = this.props.getSelectedMarker;

    getSelectedMarker(marker);
  }

  render() {
    const selectedId = this.state.selectedId;

    return (<ul className="markerList">
      {
        this.props.records.map((marker, id) => (<li key={id} className={`markerBox ${ (selectedId === id) // klikniete id z recordem z map
            ? 'selectedMarker'
            : ''}`} onClick={() => this.onSelect(marker, id)}>
          <div className="markerBox__name">
            <span>{marker.name}</span>
          </div>
          <div className="markerBox__icon">
            <img src={`http://localhost:8080/images/${marker.icon}`} alt={marker.icon}/>
          </div>
        </li>))
      }
    </ul>);
  }
}
const mapStateToProps = (state) => ({records: state.marker.records})

const mapDispatchToProps = {
  fetchRecords,
  getSelectedMarker
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkerList);
