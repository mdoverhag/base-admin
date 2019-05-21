import { connect } from "react-redux";
import { Dispatch } from "redux";

import Login from "../components/Login";

import { ProfileActionTypes } from "../store/profile/types";
import { setProfile } from "../store/profile/actions";

const mapDispatchToProps = (dispatch: Dispatch<ProfileActionTypes>) => ({
  setProfile: (email: string) => dispatch(setProfile({ email }))
});

export default connect(
  null,
  mapDispatchToProps
)(Login);
