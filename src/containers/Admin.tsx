import { connect } from "react-redux";

import Admin from "../components/Admin";

import { State } from "../store";
import { getEmail } from "../store/profile/selectors";

const mapStateToProps = (state: State) => ({
  email: getEmail(state)
});

export default connect(mapStateToProps)(Admin);
