import React from 'react';
import { withRouter } from 'next/router';

const Portfolio = props => {
  //console.log(props.router.query);
  return <div>{props.router.query.id}</div>;
};

Portfolio.getInitialProps = async ({ query }) => {
  console.log('Portfolio page');
  console.log(query);
  return {};
};

// class Portfolio extends React.Component {
//   static async getInitialProps({query}) {

//   }

//   render() {
//     return <div>{this.props.router.query.id}</div>;
//   }
//}

export default withRouter(Portfolio);
