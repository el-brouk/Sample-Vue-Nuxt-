export interface RegistrationRequest {
  email: string;
  agree: boolean;
  rules: boolean;
}

export interface RecoveryRequest {
  email: string;
}

export interface RecoveryResponse {}

export interface EditProfileRequest {}

export interface EditProfileResponse {}

export interface ChangePasswordRequest {
  email: string;
  password: string;
  userCheckWord: string;
}

export interface SetupPasswordRequest {
  email: string;
  password: string;
  confirmCode: string;
}

export interface ChangePasswordResponse {}

export interface RegistrationResponse {}
