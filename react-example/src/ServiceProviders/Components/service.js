import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import axios from "axios";
import Provider from "../Components/provider";
import {
  saveServiceResponse,
  saveProviderResponse,
  saveFilterProviderResponse
} from "../Actions/actions";

class Service extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    };
  }

  componentWillMount() {
    this.getServiceApi();
  }

  getServiceApi = () => {
    axios
      .get(
        "https://api.inquickerstaging.com/v3/winter.inquickerstaging.com/services"
      )
      .then(res => {
        this.props.saveServiceResponse(res.data.data);
        this.getProviderApi();
      })
      .catch(error => {
        console.log(error);
      });
  };

  getProviderApi = () => {
    axios
      .get(
        "https://api.inquickerstaging.com/v3/winter.inquickerstaging.com/providers?include=locations%2Cschedules.location&page%5Bnumber%5D=1&page%5Bsize%5D=10"
      )
      .then(res => {
        this.props.saveProviderResponse(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentWillReceiveProps() {}

  onServiceClick = e => {
    let filterProviderResponse = [];
    let { provider_response } = this.props;
    let selectedService = e.currentTarget.getAttribute("data-name");
    provider_response &&
      provider_response.included &&
      provider_response.included.map((item, i) => {
        if (
          item.attributes &&
          item.attributes.service &&
          item.attributes.service.toLowerCase() ===
            selectedService.toLowerCase()
        ) {
          filterProviderResponse.push(item);
        }
        return item;
      });
    if (filterProviderResponse) {
      this.filterAssociateProviders(filterProviderResponse);
    }
  };

  filterAssociateProviders = filterProviderResponse => {
    let filterAssociatedProviderResponse = [];
    let { provider_response } = this.props;

    let associatedID = filterProviderResponse[0].id;
    provider_response &&
      provider_response.data &&
      provider_response.data.map((item, i) => {
        if (
          item.relationships &&
          item.relationships.schedules &&
          item.relationships.schedules.data &&
          this.filterRelationData(
            item.relationships.schedules.data,
            associatedID
          )
        ) {
          filterAssociatedProviderResponse.push({
            isSubSpeciality: true,
            ...item
          });
        }
        return item;
      });
    if (filterAssociatedProviderResponse) {
      this.props.saveFilterProviderResponse(filterAssociatedProviderResponse);
    }
  };

  filterRelationData = (data, associateID) => {
    let isAssociateProviderAvailable = false;
    data &&
      data.map((item, i) => {
        if (item.id === associateID) {
          isAssociateProviderAvailable = true;
        }
        return item;
      });
    return isAssociateProviderAvailable;
  };

  render() {
    let { service_response } = this.props;

    let bindServiceHtml =
      service_response &&
      service_response.map((item, key) => {
        return (
          <a
            href="#"
            key={key}
            className="current"
            data-name={item.attributes.name}
            onClick={this.onServiceClick}
          >
            {item.attributes.name}
          </a>
        );
      });

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h5 className="text-muted">
              <b>SERVICES</b>
            </h5>
            <div className="serviceFilter clearfix">{bindServiceHtml}</div>
            <div>
              <Provider />
            </div>
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
      saveServiceResponse,
      saveFilterProviderResponse
    },
    dispatch
  );
}

Service = connect(
  mapStateToProps,
  mapDispatchToProps
)(Service);

export default Service;
