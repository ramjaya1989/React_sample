import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import axios from "axios";
import { saveServiceResponse, saveProviderResponse } from "../Actions/actions";

class Provider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    };
  }

  componentWillMount() {}

  componentWillReceiveProps() {}

  onProviderClick = e => {
    console.log(e.target.id);
  };

  render() {
    let { filterProvider_response } = this.props;

    let bindProviderHtml =
      filterProvider_response &&
      filterProvider_response.map((item, key) => {
        let bindSubSpecialityHtml =
          item.attributes &&
          item.attributes.subspecialties &&
          item.attributes.subspecialties.map((subSpecialitity, subkey) => {
            return <span key={subkey}>{subSpecialitity}</span>;
          });
        return (
          <li
            onClick={this.onProviderClick}
            key={key}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div className="image-parent">
              <img
                src={item.attributes["profile-image"]}
                className="img-fluid"
                alt="quixote"
              />
            </div>
            <div>
              <p>{item.attributes.name}</p>
              <p className={item.isSubSpeciality ? "show" : "hide"}>
                {bindSubSpecialityHtml}
              </p>
            </div>
          </li>
        );
      });

    return (
      <div>
        <div className="row">
          <div className="col-12 col-sm-8 col-lg-5">
            <h5 className="text-muted">
              <b>PROVIDERS</b>
            </h5>
            <ul className="list-group">{bindProviderHtml}</ul>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      saveProviderResponse,
      saveServiceResponse
    },
    dispatch
  );
}

Provider = connect(
  mapStateToProps,
  mapDispatchToProps
)(Provider);

export default Provider;
