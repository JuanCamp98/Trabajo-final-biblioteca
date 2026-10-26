import { NOTICE_TYPES } from '../constants/app';
import { LABELS } from '../constants/labels';
import Notice from './Notice';

export default function FormActions({ saving, submitError, onCancel }) {
  return (
    <>
      {submitError && <Notice type={NOTICE_TYPES.ERROR}>{submitError}</Notice>}
      <div className="form-actions">
        <button type="submit" className="button primary" disabled={saving}>
          {saving ? LABELS.COMMON.SAVING : LABELS.COMMON.SAVE}
        </button>
        <button type="button" className="button secondary" onClick={onCancel}>
          {LABELS.COMMON.CANCEL}
        </button>
      </div>
    </>
  );
}
