import { NOTICE_TYPES } from '../constants/app';

export default function Notice({ type = NOTICE_TYPES.SUCCESS, children }) {
  const className = type === NOTICE_TYPES.ERROR ? 'notice error' : 'notice';
  return <p className={className}>{children}</p>;
}
