import type {
  ChangePasswordRequest,
  ChangePasswordResponse,
  EditProfileRequest,
  EditProfileResponse,
  RecoveryRequest,
  RecoveryResponse,
  RegistrationRequest,
  RegistrationResponse,
  SetupPasswordRequest,
} from '~/api/security';

export interface SecurityState {}

const useSecurityStore = defineStore('security', {
  state: (): SecurityState => ({}),
  actions: {
    async registration(request: RegistrationRequest) {
      const { data, error, status } = await useApiFetch<RegistrationResponse>(
        '/api/app/registration',
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(request),
        }
      );

      if (data) {
        return data;
      }
    },

    async recovery(request: RecoveryRequest) {
      const { data, error, status } = await useApiFetch<RecoveryResponse>(
        '/api/app/restore/byEmail',
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(request),
        }
      );

      if (data) {
        return data;
      }
    },
    async setupPassword(request: SetupPasswordRequest) {
      const { data, error, status } = await useApiFetch<ChangePasswordResponse>(
        '/api/app/registration/setup-password',
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(request),
        }
      );

      if (data) {
        return data;
      }
    },
    async changePassword(request: ChangePasswordRequest) {
      const { data, error, status } = await useApiFetch<ChangePasswordResponse>(
        '/api/app/restore/changePassword',
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(request),
        }
      );

      if (data) {
        return data;
      }
    },
    async editProfile(request: EditProfileRequest) {
      const { data, error, status } = await useApiFetch<EditProfileResponse>(
        '/api/v1/personal/edit',
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(request),
        }
      );

      if (data) {
        return data;
      }
    },
  },
});

export default useSecurityStore;
