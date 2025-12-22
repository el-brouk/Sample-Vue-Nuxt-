import { ref, onMounted } from 'vue';
import { useScrollLock as vueUseUseScrollLock } from '@vueuse/core';

export function useScrollLock() {
	const isLocked = ref(false);
	let lockScroll: ReturnType<typeof vueUseUseScrollLock> | null = null;

	onMounted(() => {
		lockScroll = vueUseUseScrollLock(document.body);
	});

	const disableScroll = () => {
		if (lockScroll) {
			lockScroll.value = true;
			isLocked.value = true;
		}
	};

	const enableScroll = () => {
		if (lockScroll) {
			lockScroll.value = false;
			isLocked.value = false;
		}
	};

	return {
		isLocked,
		disableScroll,
		enableScroll,
		toggleScroll: () => (isLocked.value ? enableScroll() : disableScroll()),
	};
}