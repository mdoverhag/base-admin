import { connect } from "react-redux";
import { Dispatch } from "redux";

import Logout from "../components/Logout";

import { ProfileActionTypes } from "../store/profile/types";
import { unsetProfile } from "../store/profile/actions";

const mapDispatchToProps = (dispatch: Dispatch<ProfileActionTypes>) => ({
  unsetProfile: () => dispatch(unsetProfile())
});

export default connect(
  null,
  mapDispatchToProps
)(Logout);
