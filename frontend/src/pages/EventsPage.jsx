import { useState } from 'react';
import AsyncState from '../components/AsyncState';
import DataTable from '../components/DataTable';
import PageHeader from '../components/PageHeader';
import { LOG_LEVELS, LOG_TYPES } from '../constants/app';
import { LABELS } from '../constants/labels';
import { useAsync } from '../hooks/useAsync';
import { eventsService } from '../services/events.service';
import { formatDateTime } from '../utils/formatters';
import { removeEmptyValues } from '../utils/params';

const TEXTS = LABELS.EVENTS;

const COLUMNS = [
  { header: TEXTS.COLUMNS.DATE, render: (event) => formatDateTime(event.timestamp) },
  {
    header: TEXTS.COLUMNS.LEVEL,
    render: (event) => <span className={`level ${event.level}`}>{event.level}</span>,
  },
  {
    header: TEXTS.COLUMNS.TYPE,
    render: (event) => TEXTS.TYPE_NAMES[event.type] || LABELS.COMMON.NO_DATA,
  },
  { header: TEXTS.COLUMNS.MESSAGE, render: (event) => event.message },
  { header: TEXTS.COLUMNS.DETAIL, render: (event) => event.detail || LABELS.COMMON.NO_DATA },
];

export default function EventsPage() {
  const [level, setLevel] = useState('');
  const [type, setType] = useState(LOG_TYPES.EVENT);

  const {
    data: events,
    loading,
    error,
    reload,
  } = useAsync(() => eventsService.list(removeEmptyValues({ level, type })), [level, type], []);

  return (
    <>
      <PageHeader eyebrow={TEXTS.EYEBROW} title={TEXTS.TITLE} subtitle={TEXTS.SUBTITLE}>
        <button type="button" className="button secondary" onClick={reload}>
          {TEXTS.REFRESH}
        </button>
      </PageHeader>

      <section className="panel filter-panel">
        <label>
          {TEXTS.LEVEL}
          <select value={level} onChange={(event) => setLevel(event.target.value)}>
            <option value="">{TEXTS.ALL_LEVELS}</option>
            {Object.values(LOG_LEVELS).map((logLevel) => (
              <option key={logLevel} value={logLevel}>
                {logLevel}
              </option>
            ))}
          </select>
        </label>
        <label>
          {TEXTS.TYPE}
          <select value={type} onChange={(event) => setType(event.target.value)}>
            <option value="">{TEXTS.ALL_TYPES}</option>
            {Object.values(LOG_TYPES).map((logType) => (
              <option key={logType} value={logType}>
                {TEXTS.TYPE_NAMES[logType]}
              </option>
            ))}
          </select>
        </label>
      </section>

      <section className="panel table-wrap">
        <AsyncState loading={loading} error={error}>
          <DataTable
            columns={COLUMNS}
            rows={events}
            getRowKey={(event, index) => `${event.timestamp}-${index}`}
          />
        </AsyncState>
      </section>
    </>
  );
}
