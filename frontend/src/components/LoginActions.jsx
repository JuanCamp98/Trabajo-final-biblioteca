import { NOTICE_TYPES } from '../constants/app';
import { LABELS } from '../constants/labels';
import Notice from './Notice';

export default function LoginActions({ saving, submitError }) {
  return (
    <>
      {submitError && <Notice type={NOTICE_TYPES.ERROR}>{submitError}</Notice>}
      <button type="submit" className="button primary" disabled={saving}>
        {saving ? LABELS.LOGIN.SUBMITTING : LABELS.LOGIN.SUBMIT}
      </button>
    </>
  );
}
