import { openDialog } from 'vue3-promise-dialog';
import UiModalConfirmation from '@/components/Ui/Modal/UiModalConfirmation.vue';

export async function useConfirmation(header?: string, text?: string) {
    return await openDialog(UiModalConfirmation, { header, text });
}
