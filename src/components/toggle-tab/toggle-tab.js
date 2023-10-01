import React from 'react';
import './toggle-tab.css';

class ToggleTab extends React.Component {
  render() {
    const { active } = this.props;
    let activeEl1 = 'search ';
    let activeEl2 = 'rated ';
    if (active === 'search') activeEl1 += 'active';
    else if (active === 'rated') activeEl2 += 'active';
    return (
      <form
        className="tabs"
        onChange={(e) => {
          this.props.changePage(e.target.value);
        }}
      >
        <label className={`${activeEl1}`}>
          <input className="search__input" type="radio" name="myRadio" value="search" defaultChecked></input>
          Search
        </label>
        <label className={`${activeEl2}`}>
          <input className="rated__input" type="radio" name="myRadio" value="rated"></input>
          Rated
        </label>
      </form>
    );
  }
}

export default ToggleTab;
