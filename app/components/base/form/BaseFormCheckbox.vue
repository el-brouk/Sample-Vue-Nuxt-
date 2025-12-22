<script setup lang="ts">
import { ErrorMessage, Field } from 'vee-validate'

import type { SchemaItem } from '~/model/schema'

const props = defineProps<{
	schema: SchemaItem
	modelValue: string | boolean | number | null
}>()
const emit = defineEmits<{
	(e: 'update:modelValue', value: string | boolean | number | null): void
}>()

const isChecked = computed(() => props.modelValue)

function changeValue() {
	emit('update:modelValue', !isChecked.value)
}
</script>

<template>
	<div class="base-checkbox">
		<label class="base-checkbox__label">
			<Field :name="schema.name" type="checkbox" class="base-checkbox__control" :modelValue="modelValue"
				v-slot="{ field, errors, handleChange }" :value="true">
				<input class="visually-hidden" :class="{ error: errors.length }" type="checkbox" v-bind="field"
					:value="field.value" @change="changeValue" v-bind:true-value="{ action: 'on', value: !!modelValue }"
					v-bind:false-value="{ action: 'off', value: !modelValue }" :ref="schema.ref ? schema.ref : 'input'" />
			</Field>

			<span class="base-checkbox__text">
				<span v-html="schema.label"></span>
			</span>

			<ErrorMessage class="base-checkbox__error" as="div" :name="schema.name" v-slot="{ message }">
				<span>{{ message }}</span>
			</ErrorMessage>
		</label>
	</div>
</template>

<style lang="scss" scoped>
@use "@/assets/scss/helpers/_variables.scss" as *;
@use "@/assets/scss/helpers/_mixins.scss" as *;

.base-checkbox {
	display: block;
	cursor: pointer;

	input:checked+.base-checkbox__text::before {
		background-image: url('data:image/svg+xml,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="22" height="22" rx="3" fill="%230359A8"/><rect x="1" y="1" width="22" height="22" rx="3" stroke="%230359A8" stroke-width="2"/><path d="M5.33301 12L10.333 17L18.6663 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>');
	}
}

.base-checkbox__label {
	display: block;
	cursor: pointer;
}

.base-checkbox__text {
	display: flex;
	align-items: center;
	font-style: normal;
	font-size: 14px;
	font-weight: 400;
	line-height: 140%;
	transition: $base-transition;

	&::before {
		content: "";
		display: block;
		width: 24px;
		height: 24px;
		flex-shrink: 0;
		margin-right: 24px;
		background-image: url('data:image/svg+xml,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="22" height="22" rx="3" stroke="%230359A8" stroke-width="2"/></svg>');
		background-position: center;
		background-repeat: no-repeat;
		background-size: contain;
	}

	::v-deep(a) {
		font-weight: 500;
		transition: $base-transition;
		text-decoration-line: underline;
		text-decoration-style: solid;
		text-underline-position: from-font;
		text-decoration-skip-ink: none;

		@include hover {
			color: $accent;
		}
	}
}

.base-checkbox__error {
	position: absolute;
  display: block;
  text-align: left;
  color: red;
  font-size: 10px;
  font-weight: 400;
  line-height: 160%;
  letter-spacing: 0.4px;
}
</style>
