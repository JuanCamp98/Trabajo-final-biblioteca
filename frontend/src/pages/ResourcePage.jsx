import AsyncState from '../components/AsyncState';
import DataTable from '../components/DataTable';
import Notice from '../components/Notice';
import PageHeader from '../components/PageHeader';
import ResourceForm from '../components/ResourceForm';
import { LABELS } from '../constants/labels';
import { RESOURCE_CONFIG } from '../constants/resources';
import { useCrudPage } from '../hooks/useCrudPage';
import { RESOURCE_SERVICES } from '../services/library.service';

export default function ResourcePage({ resourceKey }) {
  const config = RESOURCE_CONFIG[resourceKey];
  const service = RESOURCE_SERVICES[resourceKey];

  const crud = useCrudPage({ service, loadItems: () => service.list() });

  const columns = config.fields.map((field) => ({
    header: field.label,
    render: (item) => item[field.name] || LABELS.COMMON.NO_DATA,
  }));

  const renderActions = (item) => (
    <div className="table-actions">
      <button type="button" className="button secondary small" onClick={() => crud.openEditForm(item)}>
        {LABELS.COMMON.EDIT}
      </button>
      <button
        type="button"
        className="button danger small"
        onClick={() => crud.remove(item, config.getName(item))}
      >
        {LABELS.COMMON.DELETE}
      </button>
    </div>
  );

  return (
    <>
      <PageHeader
        eyebrow={LABELS.COMMON.ADMIN_EYEBROW}
        title={config.label}
        subtitle={LABELS.COMMON.RESOURCE_SUBTITLE(config.label)}
      >
        <button type="button" className="button primary" onClick={crud.openCreateForm}>
          {LABELS.COMMON.ADD_TITLE(config.singular)}
        </button>
      </PageHeader>

      {crud.feedback && <Notice type={crud.feedback.type}>{crud.feedback.text}</Notice>}

      {crud.isFormOpen && (
        <ResourceForm
          key={crud.selectedItem?.id ?? 'new'}
          config={config}
          item={crud.selectedItem}
          onSubmit={crud.save}
          onCancel={crud.closeForm}
        />
      )}

      <section className="panel table-wrap">
        <AsyncState loading={crud.loading} error={crud.error}>
          <DataTable columns={columns} rows={crud.items} renderActions={renderActions} />
        </AsyncState>
      </section>
    </>
  );
}
