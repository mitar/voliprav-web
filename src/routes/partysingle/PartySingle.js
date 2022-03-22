// @flow

import React, { PureComponent } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Collapsable from '../../components/Collapsable';
import PartyProfile from '../../components/PartyProfile';
import { getAssetUrl } from '../../utils';
import s from './PartySingle.scss';

class PartySingle extends PureComponent {
  render() {
    const { party, categories } = this.props;

    return (
      <div className={s.root}>
        <div className={s.header}>
          <PartyProfile {...party} />
          <img
            className={s.logo}
            src={getAssetUrl(false, 'party-icons', party.url)}
            alt="Logo"
          />
        </div>
        <div className={s.topics}>
          <Collapsable
            items={
              categories &&
              categories.map(({ name, category, statement }) => ({
                key: category,
                title: name,
                content:
                  statement ||
                  `Stranka ${party.name} ni podala izjave v zvezi s tematiko ${name}.`,
              }))
            }
          />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(PartySingle);
