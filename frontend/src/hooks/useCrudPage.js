import { useState } from 'react';
import { NOTICE_TYPES } from '../constants/app';
import { MESSAGES } from '../constants/messages';
import { getErrorMessage } from '../utils/errors';
import { useAsync } from './useAsync';

export function useCrudPage({ service, loadItems, dependencies = [] }) {
  const { data: items, loading, error, reload } = useAsync(loadItems, dependencies, []);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const openCreateForm = () => {
    setSelectedItem(null);
    setFeedback(null);
    setIsFormOpen(true);
  };

  const openEditForm = (item) => {
    setSelectedItem(item);
    setFeedback(null);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setSelectedItem(null);
  };

  const save = async (values) => {
    const message = selectedItem ? MESSAGES.UPDATED : MESSAGES.CREATED;

    if (selectedItem) await service.update(selectedItem.id, values);
    else await service.create(values);

    closeForm();
    setFeedback({ type: NOTICE_TYPES.SUCCESS, text: message });
    reload();
  };

  const remove = async (item, name) => {
    if (!window.confirm(MESSAGES.CONFIRM_DELETE(name))) return;

    try {
      await service.remove(item.id);
      setFeedback({ type: NOTICE_TYPES.SUCCESS, text: MESSAGES.DELETED });
      reload();
    } catch (err) {
      setFeedback({ type: NOTICE_TYPES.ERROR, text: getErrorMessage(err, MESSAGES.DELETE_ERROR) });
    }
  };

  return {
    items,
    loading,
    error,
    isFormOpen,
    selectedItem,
    feedback,
    openCreateForm,
    openEditForm,
    closeForm,
    save,
    remove,
  };
}
