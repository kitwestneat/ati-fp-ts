import React, { PureComponent } from 'react';

import { SOCIAL_LINKS_REDUCED } from '@/constants';
import { NavBar, SocialLinks, Logo, HamburgerIcon } from '../NavBar';

interface Props {
  onMenuButtonClick: () => void;
}

export default class MobileNavBar extends PureComponent<Props> {
  render() {
    const { onMenuButtonClick } = this.props;

    return (
      <NavBar
        renderRight={() => <HamburgerIcon onClick={onMenuButtonClick} />}
        renderCenter={() => <Logo />}
        renderLeft={() => <SocialLinks links={SOCIAL_LINKS_REDUCED} />}
      />
    );
  }
}
