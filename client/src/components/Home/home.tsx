import React from 'react';
import './home.css';
import Header from '../Common/header';
import UserTable from '../Common/user-table';

/**
 * Functional component representing home page
 * @function
 * @param history Router history
 * @returns home Home component
 */
const Home = ({ history } : { history : any }) => {
  /**
   * Renders login title
   * @function
   * @returns title Title element
   */
  const renderTitle = (): JSX.Element => {
    return (
      <div className="row mt-3">
        <h1 id="title" className="mx-auto">Voicemod users administration panel</h1>
      </div>
    )
  }

  // FIXME -> Move table to a component
  return (
    <>
      <Header history={history} />
      <div className="row">
        <div className="col-sm-12 text-center" id="home">
          {renderTitle()}
          <UserTable />
        </div>
      </div>
    </>
  )
}
export default Home;
