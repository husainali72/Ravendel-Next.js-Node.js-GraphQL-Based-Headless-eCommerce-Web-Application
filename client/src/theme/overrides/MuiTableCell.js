import palette from '../palette';
import typography from '../typography';

export default {
  styleOverrides: {
  root: {
    ...typography.body1,
    borderBottom: `1px solid ${palette.divider}`
  }}
};
