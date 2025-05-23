/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

/**
 * Supported timezones in IANA format.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "supportedTimezones".
 */
export type SupportedTimezones =
  | 'Pacific/Midway'
  | 'Pacific/Niue'
  | 'Pacific/Honolulu'
  | 'Pacific/Rarotonga'
  | 'America/Anchorage'
  | 'Pacific/Gambier'
  | 'America/Los_Angeles'
  | 'America/Tijuana'
  | 'America/Denver'
  | 'America/Phoenix'
  | 'America/Chicago'
  | 'America/Guatemala'
  | 'America/New_York'
  | 'America/Bogota'
  | 'America/Caracas'
  | 'America/Santiago'
  | 'America/Buenos_Aires'
  | 'America/Sao_Paulo'
  | 'Atlantic/South_Georgia'
  | 'Atlantic/Azores'
  | 'Atlantic/Cape_Verde'
  | 'Europe/London'
  | 'Europe/Berlin'
  | 'Africa/Lagos'
  | 'Europe/Athens'
  | 'Africa/Cairo'
  | 'Europe/Moscow'
  | 'Asia/Riyadh'
  | 'Asia/Dubai'
  | 'Asia/Baku'
  | 'Asia/Karachi'
  | 'Asia/Tashkent'
  | 'Asia/Calcutta'
  | 'Asia/Dhaka'
  | 'Asia/Almaty'
  | 'Asia/Jakarta'
  | 'Asia/Bangkok'
  | 'Asia/Shanghai'
  | 'Asia/Singapore'
  | 'Asia/Tokyo'
  | 'Asia/Seoul'
  | 'Australia/Brisbane'
  | 'Australia/Sydney'
  | 'Pacific/Guam'
  | 'Pacific/Noumea'
  | 'Pacific/Auckland'
  | 'Pacific/Fiji';

export interface Config {
  auth: {
    users: UserAuthOperations;
    admins: AdminAuthOperations;
  };
  blocks: {};
  collections: {
    users: User;
    media: Media;
    'contact-forms': ContactForm;
    admins: Admin;
    'registry-forms': RegistryForm;
    'registry-members': RegistryMember;
    languages: Language;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {};
  collectionsSelect: {
    users: UsersSelect<false> | UsersSelect<true>;
    media: MediaSelect<false> | MediaSelect<true>;
    'contact-forms': ContactFormsSelect<false> | ContactFormsSelect<true>;
    admins: AdminsSelect<false> | AdminsSelect<true>;
    'registry-forms': RegistryFormsSelect<false> | RegistryFormsSelect<true>;
    'registry-members': RegistryMembersSelect<false> | RegistryMembersSelect<true>;
    languages: LanguagesSelect<false> | LanguagesSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: string;
  };
  globals: {};
  globalsSelect: {};
  locale: null;
  user:
    | (User & {
        collection: 'users';
      })
    | (Admin & {
        collection: 'admins';
      });
  jobs: {
    tasks: unknown;
    workflows: unknown;
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
export interface AdminAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  _verified?: boolean | null;
  _verificationToken?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: string;
  alt: string;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "contact-forms".
 */
export interface ContactForm {
  id: string;
  name: string;
  email: string;
  reason: string;
  message: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "admins".
 */
export interface Admin {
  id: string;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "registry-forms".
 */
export interface RegistryForm {
  id: string;
  registry_status?: ('approved' | 'review') | null;
  submittedBy?: string | null;
  firstName: string;
  lastName: string;
  languages: (string | Language)[];
  email: string;
  primaryPhoneNumber: string;
  preferredContactMethod: 'email' | 'phone';
  profession:
    | 'acupuncturist'
    | 'art_therapist'
    | 'audiologist'
    | 'chiropractor'
    | 'dentist'
    | 'dietitian'
    | 'denturologist'
    | 'occupational_therapist'
    | 'nurse'
    | 'kinesiologist'
    | 'massage_therapist'
    | 'physician'
    | 'optometrist'
    | 'osteopath'
    | 'pharmacist'
    | 'podiatrist'
    | 'physiotherapist'
    | 'psychologist'
    | 'psychotherapist'
    | 'social_worker'
    | 'speech_language_pathologist';
  specialty?: string | null;
  graduationDate?: string | null;
  professionalOrder:
    | 'ooaq'
    | 'ocq'
    | 'oeq'
    | 'ondq'
    | 'psychologues'
    | 'opiq'
    | 'oppq'
    | 'podiatres'
    | 'oiiq'
    | 'pharmaciens'
    | 'dentistes'
    | 'none'
    | 'other';
  sector: 'public' | 'private';
  isAcceptingPatients: 'yes' | 'no' | 'yes_temporary' | 'no_later' | 'yes_private';
  newPatientAcceptanceDate?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "languages".
 */
export interface Language {
  id: string;
  autonym: string;
  code: string;
  heteronym?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "registry-members".
 */
export interface RegistryMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  primaryPhoneNumber: string;
  preferredContactMethod: 'email' | 'phone';
  languages: (string | Language)[];
  profession:
    | 'acupuncturist'
    | 'art_therapist'
    | 'audiologist'
    | 'chiropractor'
    | 'dentist'
    | 'dietitian'
    | 'denturologist'
    | 'occupational_therapist'
    | 'nurse'
    | 'kinesiologist'
    | 'massage_therapist'
    | 'physician'
    | 'optometrist'
    | 'osteopath'
    | 'pharmacist'
    | 'podiatrist'
    | 'physiotherapist'
    | 'psychologist'
    | 'psychotherapist'
    | 'social_worker'
    | 'speech_language_pathologist';
  specialty?: string | null;
  graduationDate?: string | null;
  professionalOrder:
    | 'ooaq'
    | 'ocq'
    | 'oeq'
    | 'ondq'
    | 'psychologues'
    | 'opiq'
    | 'oppq'
    | 'podiatres'
    | 'oiiq'
    | 'pharmaciens'
    | 'dentistes'
    | 'none'
    | 'other';
  sector: 'public' | 'private';
  isAcceptingPatients: 'yes' | 'no' | 'yes_temporary' | 'no_later' | 'yes_private';
  newPatientAcceptanceDate?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: string;
  document?:
    | ({
        relationTo: 'users';
        value: string | User;
      } | null)
    | ({
        relationTo: 'media';
        value: string | Media;
      } | null)
    | ({
        relationTo: 'contact-forms';
        value: string | ContactForm;
      } | null)
    | ({
        relationTo: 'admins';
        value: string | Admin;
      } | null)
    | ({
        relationTo: 'registry-forms';
        value: string | RegistryForm;
      } | null)
    | ({
        relationTo: 'registry-members';
        value: string | RegistryMember;
      } | null)
    | ({
        relationTo: 'languages';
        value: string | Language;
      } | null);
  globalSlug?: string | null;
  user:
    | {
        relationTo: 'users';
        value: string | User;
      }
    | {
        relationTo: 'admins';
        value: string | Admin;
      };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user:
    | {
        relationTo: 'users';
        value: string | User;
      }
    | {
        relationTo: 'admins';
        value: string | Admin;
      };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  _verified?: T;
  _verificationToken?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
  alt?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "contact-forms_select".
 */
export interface ContactFormsSelect<T extends boolean = true> {
  name?: T;
  email?: T;
  reason?: T;
  message?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "admins_select".
 */
export interface AdminsSelect<T extends boolean = true> {
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "registry-forms_select".
 */
export interface RegistryFormsSelect<T extends boolean = true> {
  registry_status?: T;
  submittedBy?: T;
  firstName?: T;
  lastName?: T;
  languages?: T;
  email?: T;
  primaryPhoneNumber?: T;
  preferredContactMethod?: T;
  profession?: T;
  specialty?: T;
  graduationDate?: T;
  professionalOrder?: T;
  sector?: T;
  isAcceptingPatients?: T;
  newPatientAcceptanceDate?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "registry-members_select".
 */
export interface RegistryMembersSelect<T extends boolean = true> {
  firstName?: T;
  lastName?: T;
  email?: T;
  primaryPhoneNumber?: T;
  preferredContactMethod?: T;
  languages?: T;
  profession?: T;
  specialty?: T;
  graduationDate?: T;
  professionalOrder?: T;
  sector?: T;
  isAcceptingPatients?: T;
  newPatientAcceptanceDate?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "languages_select".
 */
export interface LanguagesSelect<T extends boolean = true> {
  autonym?: T;
  code?: T;
  heteronym?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}