import React, { useState } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Party.scss';
import { getAssetUrl } from '../../utils';
import Link from '../../Link';
import ReactTooltip from 'react-tooltip';

const Container = ({
  url,
  href,
  onClick,
  isSelected,
  isFaded,
  letter,
  name,
  leader,
  leaderShort,
  isDisabled,
  disabledMessage,
}) => {
  let partyRef;
  console.log('useState', useState);
  // const [isDisabledMessageShown, setIsDisabledMessageShown] = useState(false);
  const Wrap = href ? Link : 'button';
  return (
    <Wrap
      href={href}
      onClick={!isDisabled ? onClick : () => { ReactTooltip.show(partyRef) }}
      // onMouseOver={isDisabled ? () => { console.log('onMouse') } : undefined}
      className={cx(s.party, isSelected && s.isSelected, isFaded && s.isFaded, isDisabled && s.isDisabled)}
      data-tip={isDisabled ? disabledMessage : undefined}
      ref={ref => partyRef = ref}
    >
      <span className={s.imgWrap}>
        <img
          src={getAssetUrl(false, 'party-icons', url)}
          className={s.image}
          alt={`${name}'s logo`}
        />
      </span>
      <span className={s.info}>
        <h3 className={s.name}>{name}</h3>
        <p className={s.leader}>{leaderShort ? leaderShort : leader}</p>

        <span className={s.letter}>
          { /* <span>x</span> */ }
          {letter}
        </span>
      </span>
      {/*isDisabledMessageShown && (
        <div>
          {disabledMessage}
        </div>
      )*/}
    </Wrap>
  );
};

export default withStyles(s)(Container);
