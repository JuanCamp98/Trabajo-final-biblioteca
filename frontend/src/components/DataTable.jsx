import { LABELS } from '../constants/labels';

export default function DataTable({ columns, rows, renderActions, getRowKey = (row) => row.id }) {
  if (rows.length === 0) return <p className="empty">{LABELS.COMMON.EMPTY}</p>;

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.header}>{column.header}</th>
          ))}
          {renderActions && <th>{LABELS.COMMON.ACTIONS}</th>}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={getRowKey(row, index)}>
            {columns.map((column) => (
              <td key={column.header}>{column.render(row)}</td>
            ))}
            {renderActions && <td>{renderActions(row)}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
