import { LABELS } from '../constants/labels';
import { NOTICE_TYPES } from '../constants/app';
import Notice from './Notice';

export default function AsyncState({ loading, error, children }) {
  if (loading) return <p className="empty">{LABELS.COMMON.LOADING}</p>;
  if (error) return <Notice type={NOTICE_TYPES.ERROR}>{error}</Notice>;
  return children;
}
