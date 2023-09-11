import { ref } from 'vue';

export default function useDelayedStatusChange(initialStatus = false) {
  const status = ref(initialStatus);
  const mouseOut = ref(true);

  const changeStatusFewSecond = () => {
    mouseOut.value = false;

    setTimeout(() => {
      if (mouseOut.value == false) {
        status.value = true;
      }
    }, 300);
  };

  return { status, mouseOut, changeStatusFewSecond };
}
