import React from 'react';
import PropTypes from 'prop-types';
import {
  ColorKeyContainer,
  ColorKeyItem,
  SortedBox,
  UnsortedBox,
  GroupABox,
  GroupBBox,
  GroupCBox,
  GroupDBox,
} from './ColorKey.styled'; // <--- import styled components

const ColorKey = ({ groupA, groupB, groupC, groupD }) => {
  const keySorted =
    groupA || groupB || groupC || groupD ? (
      <ColorKeyItem>
        <SortedBox />
        <span>Sorted</span>
      </ColorKeyItem>
    ) : (
      <ColorKeyItem>
        <UnsortedBox />
        <span>Unsorted</span>
      </ColorKeyItem>
    );

  const keyA = groupA ? (
    <ColorKeyItem>
      <GroupABox />
      <span>{groupA}</span>
    </ColorKeyItem>
  ) : null;

  const keyB = groupB ? (
    <ColorKeyItem>
      <GroupBBox />
      <span>{groupB}</span>
    </ColorKeyItem>
  ) : null;

  const keyC = groupC ? (
    <ColorKeyItem>
      <GroupCBox />
      <span>{groupC}</span>
    </ColorKeyItem>
  ) : null;

  const keyD = groupD ? (
    <ColorKeyItem>
      <GroupDBox />
      <span>{groupD}</span>
    </ColorKeyItem>
  ) : null;

  return (
    <ColorKeyContainer>
      {keySorted}
      {keyA}
      {keyB}
      {keyC}
      {keyD}
    </ColorKeyContainer>
  );
};

ColorKey.propTypes = {
  groupA: PropTypes.string,
  groupB: PropTypes.string,
  groupC: PropTypes.string,
  groupD: PropTypes.string,
};

export default ColorKey;