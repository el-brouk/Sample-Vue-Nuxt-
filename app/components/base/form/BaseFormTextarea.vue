<script setup lang="ts">
import { ErrorMessage, Field } from 'vee-validate'
import type { SchemaItem } from '~/model/schema'

const props = defineProps<{
	schema: SchemaItem
	modelValue: string
	formatted?: boolean
	secondary?: boolean
	disabled?: boolean
	bordered?: boolean
	size?: string
}>()

const emit = defineEmits<{
	(e: 'focus'): void
	(e: 'update:modelValue', value: string | boolean | number | null): void
}>()

const isFocus = ref(false)

const inputValue = computed(() => (props.formatted ? format(props.modelValue) : props.modelValue))

function handleFocus() {
	isFocus.value = true
	emit('focus')
}

function format(value: string | boolean | number | null) {
	if (!value) {
		return ''
	}

	return parseFloat(value.toString())
		.toFixed(0)
		.replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1 ')
}

function changeValue(event: any) {
	emit('update:modelValue', event.target.value)
}
</script>

<template>
	<div class="base-textarea" v-bind:class="[{ 'base-textarea--disabled': schema.disabled }]">
		<Field :name="schema.name" :modelValue="modelValue" :type="schema.type ?? 'text'" @change="changeValue"
			v-slot="{ field, meta, handleChange, handleBlur }" @handleChange="changeValue">
			<label class="base-textarea__label" v-if="schema.label">{{ schema.label }}</label>
			<div class="base-textarea__wrap" v-bind:class="{ 'base-textarea__wrap--error': !meta.valid && meta.validated }">
				<textarea class="base-textarea__control" :id="schema.name" v-html="inputValue" @keyup="changeValue"
					:placeholder="schema.placeholder ? schema.placeholder : ''" :ref="schema.ref ? schema.ref : 'textarea'"
					:name="schema.name" :readonly="disabled" @focus="handleFocus" @blur="handleBlur"></textarea>
			</div>
		</Field>
		<ErrorMessage class="base-textarea__error" :name="schema.name" />
	</div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/helpers/_variables.scss' as *;
@use '@/assets/scss/helpers/_mixins.scss' as *;

textarea:-webkit-autofill {
	transition: all 5000s ease-in-out 0s;
}

.base-textarea {
	position: relative;
	width: 100%;
}

.base-textarea__wrap {
	position: relative;

	&--error {
		.base-textarea__control {
			border-color: red;
		}
	}
}

.base-textarea__control {
	width: 100%;
	min-height: 97px;
	padding: 11px 16px;
	border: 1px solid transparent;
  border-radius: 4px;
  background: $white;
	outline: none;
	resize: none;
	transition: $base-transition;
	@include no-scrollbar;

	&::placeholder {
		font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    color: #002445;
	}

	&:disabled {
		opacity: 0.6;
	}
}

.base-textarea__label {
	display: block;
  margin-bottom: 8px;
  font-size: 12px;
  font-weight: 300;
  line-height: 140%;
}

.base-textarea__error {
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
