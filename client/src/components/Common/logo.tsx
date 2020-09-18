import React from 'react';

/**
 * Functional component representing a logo
 * @function
 * @returns logo Logo component
 */
const Logo = () => {
  return (
    <div className="row mx-auto">
      <img
        src="https://www.voicemod.net/v3/wp-content/themes/voicemod/inc/assets/img/logo-header.png"
        alt="Voicemod coding challenge"
        className="img-fluid"
      />
    </div>
  )
}
export default Logo;
