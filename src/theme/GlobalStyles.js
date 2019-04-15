import React, { Fragment, memo } from 'react';
import { H1Global } from 'theme/components/Text/H1';
import { H2Global } from 'theme/components/Text/H2';
import { H3Global } from 'theme/components/Text/H3';
import { BodyGlobal, PGlobal } from 'theme/components/Text/Body';

const GlobalStyles = () => (
  <Fragment>
    <H1Global />
    <H2Global />
    <H3Global />
    <BodyGlobal />
    <PGlobal />
  </Fragment>
);

export default memo(GlobalStyles);
