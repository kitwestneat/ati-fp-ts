import * as React from 'react';
import { ResponsiveSuperLeaderboard } from '../../ads';
import { Row } from '../../primitives';

export default class BetweenModuleAd extends React.PureComponent {
  public render() {
    return (
      <Row style={{ alignItems: 'center', marginBottom: 30 }}>
        <ResponsiveSuperLeaderboard />
      </Row>
    );
  }
}
