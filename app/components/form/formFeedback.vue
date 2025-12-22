<template>
  <div class="feedback-form">
    <VeeForm v-slot="{ handleSubmit }" :validation-schema="validationSchema" as="div">
      <form class="feedback-form__form" @submit.prevent="handleSubmit($event, onSubmit)">
        <div class="feedback-form__form-group feedback-form__form-group--double">
          <div class="feedback-form__form-item">
            <base-form-input v-model="formData.name" :schema="schemaFields.name" />
          </div>
          <div class="feedback-form__form-item">
            <base-form-input v-model="formData.phone" :schema="schemaFields.phone" />
          </div>
        </div>

        <div class="feedback-form__form-group">
          <div class="feedback-form__form-item">
            <base-form-input v-model="formData.email" :schema="schemaFields.email" />
          </div>
        </div>

        <div class="feedback-form__form-group">
          <div class="feedback-form__form-item">
            <base-form-textarea
              v-model="formData.comment"
              :schema="schemaFields.comment"
              :value="formData.comment"
            />
          </div>
        </div>

        <div class="feedback-form__agree-block">
          <base-form-checkbox v-model="formData.agree" :schema="schemaFields.agree" />
        </div>
        <div class="feedback-form__controls">
          <base-button class="feedback-form__btn" primary size="small" type="submit">
            <span>Отправить</span>
            <base-svg icon="arrow" />
          </base-button>
        </div>
      </form>
    </VeeForm>
  </div>
</template>

<script setup lang="ts">
import * as yup from 'yup';
import { ErrorMessage, Field, Form as VeeForm } from 'vee-validate';
const emit = defineEmits(['submit']);

const isSuccess = ref<boolean>(false);

const formData = reactive({
  name: '',
  phone: '',
  email: '',
  comment: '',
  agree: true,
});

const currentPhoneMask = ref('+7(###)###-##-##');

const phoneRegex = computed(() => createRegexFromMask(currentPhoneMask.value));

function createRegexFromMask(mask: string): RegExp {
  const escapedMask = mask.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&').replace(/#/g, '\\d');

  return new RegExp(`^${escapedMask}$`);
}

const schemaFields = {
  name: {
    as: 'name',
    placeholder: 'Имя',
    name: 'name',
    type: 'text',
    required: true,
  },
  phone: {
    as: 'phone',
    name: 'phone',
    placeholder: 'Телефон',
    type: 'tel',
    required: true,
  },
  email: {
    as: 'email',
    placeholder: 'E-mail',
    name: 'email',
    type: 'text',
  },
  comment: {
    as: 'comment',
    placeholder: 'Комментарий',
    name: 'comment',
    type: 'text',
  },
  agree: {
    name: 'agree',
    label: 'Даю согласие на <a href="#" target="_blank">обработку персональных данных</a>',
    checked: true,
  },
};

const validationSchema = computed(() => {
  return yup.object({
    name: yup.string().required('Пожалуйста, заполните это поле!'),
    phone: yup
      .string()
      .required('Пожалуйста, заполните это поле!')
      .test('valid-phone', 'Введите телефон в правильном формате', (value) => {
        return phoneRegex.value.test(value || '');
      }),
    email: yup.string().required('Пожалуйста, заполните это поле!'),
    agree: yup.boolean().oneOf([true], 'Пожалуйста, заполните это поле!'),
  });
});

function updatePhoneMask(newMask: string) {
  currentPhoneMask.value = newMask;
}

async function onSubmit() {
  try {
    // await formStore.sendForm(formData);
    emit('submit');
    // showSuccessMessage();
  } catch (error) {
    // showErrorMessage();
  }
  clearData();
}

function clearData() {
  formData.name = '';
  formData.phone = '';
  formData.email = '';
  formData.comment = '';
  formData.agree = true;
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/helpers/_variables' as *;
@use '@/assets/scss/helpers/_mixins' as *;

.feedback-form__form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.feedback-form__form-group {
  display: grid;
  gap: 24px;

  &--double {
    grid-template-columns: repeat(2, 1fr);

    @include phone {
      grid-template-columns: 1fr;
    }
  }
}

.feedback-form__controls {
  @include phone {
    .base-button {
      width: 100%;
    }
  }
}
</style>
