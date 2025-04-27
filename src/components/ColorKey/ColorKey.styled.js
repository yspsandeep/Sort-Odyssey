// ColorKey.styled.js
import { styled } from '@mui/system';

export const ColorKeyContainer = styled('div')({
  display: 'flex',
  flexFlow: 'row wrap',
  padding: '1rem',
  width: '80%',
  maxWidth: '1200px',
  margin: '0 auto',
  textAlign: 'left',
});

export const ColorKeyItem = styled('div')({
  display: 'inline-flex',
  alignItems: 'center',
  marginRight: '4rem',
  padding: '4px',
});

export const ColorKeyBox = styled('div')({
  flexShrink: 0,
  height: '1rem',
  width: '1rem',
  marginRight: '0.5rem',
});

// Box variants
export const UnsortedBox = styled(ColorKeyBox)({
  border: '1px solid var(--text-color)',
  backgroundColor: 'var(--white)',
});

export const SortedBox = styled(ColorKeyBox)({
  backgroundColor: 'var(--primary-dark)',
});

export const GroupABox = styled(ColorKeyBox)({
  backgroundColor: 'var(--amber)',
});

export const GroupBBox = styled(ColorKeyBox)({
  backgroundColor: 'var(--secondary)',
});

export const GroupCBox = styled(ColorKeyBox)({
  backgroundColor: 'var(--red)',
});

export const GroupDBox = styled(ColorKeyBox)({
  backgroundColor: 'var(--blue)',
});
