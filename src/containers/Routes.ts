import { connect } from "react-redux";

import Routes from "../components/Routes";

import { State } from "../store";
import { getIsLoggedIn } from "../store/profile/selectors";

const mapStateToProps = (state: State) => ({
  isLoggedIn: getIsLoggedIn(state)
});

export default connect(mapStateToProps)(Routes);
