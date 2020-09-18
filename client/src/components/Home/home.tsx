import React from 'react';
import './home.css';
import Header from '../Common/header';

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
        <h1 id="title" className="mx-auto">Voicemode users administration panel</h1>
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
          <div className="table-responsive mt-3">
            <table id="users-table" className="table">
              <thead className="bg-primary">
                <tr>
                  <th className="text-white">Name</th>
                  <th className="text-white">Last name</th>
                  <th className="text-white">Email</th>
                  <th className="text-white">Country</th>
                  <th className="text-white">Telephone</th>
                  <th className="text-white">Postcode</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
export default Home;
