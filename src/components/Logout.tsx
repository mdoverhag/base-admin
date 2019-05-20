import React from 'react';

import { Link } from 'react-router-dom';

import ContentDiv from './lib/ContentDiv';
import RootDiv from './lib/RootDiv';

const Logout: React.FC = () => (
  <RootDiv>
    <ContentDiv withPaper>
      You are logged out: <Link to="/login">Log in</Link>
    </ContentDiv>
  </RootDiv>
);

export default Logout;
