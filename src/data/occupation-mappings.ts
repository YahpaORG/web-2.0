export const occupationMappings = {
  Dentist: {
    en: 'Dentist',
    fr: 'Dentiste',
    vi: 'Nha sĩ',
    zh: '牙医',
  },
  Podiatrist: {
    en: 'Podiatrist',
    fr: 'Podologue',
    vi: 'Bác sĩ chân',
    zh: '足科医生',
  },
  Chiropractor: {
    en: 'Chiropractor',
    fr: 'Chiropraticien',
    vi: 'Bác sĩ chỉnh hình xương khớp',
    zh: '脊椎指压治疗师',
  },
  Physiotherapist: {
    en: 'Physiotherapist',
    fr: 'Physiothérapeute',
    vi: 'Nhà trị liệu vật lý',
    zh: '物理治疗师',
  },
  'Dietitian/Nutritionist': {
    en: 'Dietitian/Nutritionist',
    fr: 'Diététiste/Nutritionniste',
    vi: 'Chuyên gia dinh dưỡng',
    zh: '营养师',
  },
  'Occupational Therapist': {
    en: 'Occupational Therapist',
    fr: 'Ergothérapeute',
    vi: 'Nhà trị liệu nghề nghiệp',
    zh: '职业治疗师',
  },
  Psychologist: {
    en: 'Psychologist',
    fr: 'Psychologue',
    vi: 'Nhà tâm lý học',
    zh: '心理学家',
  },
  Audiologist: {
    en: 'Audiologist',
    fr: 'Audiologiste',
    vi: 'Chuyên gia thính lực',
    zh: '听力学家',
  },
  Dietitian: {
    en: 'Dietitian',
    fr: 'Diététiste',
    vi: 'Chuyên gia dinh dưỡng',
    zh: '营养师',
  },
  'Massage Therapist': {
    en: 'Massage Therapist',
    fr: 'Massothérapeute',
    vi: 'Nhà trị liệu massage',
    zh: '按摩治疗师',
  },
  'Sexologist / Psychotherapist': {
    en: 'Sexologist / Psychotherapist',
    fr: 'Sexologue / Psychothérapeute',
    vi: 'Chuyên gia tình dục / Nhà trị liệu tâm lý',
    zh: '性学家 / 心理治疗师',
  },
  Pharmacist: {
    en: 'Pharmacist',
    fr: 'Pharmacien',
    vi: 'Dược sĩ',
    zh: '药剂师',
  },
  Psychiatry: {
    en: 'Psychiatry',
    fr: 'Psychiatre',
    vi: 'Bác sĩ tâm thần',
    zh: '精神科医生',
  },
  'Individual and Couple Therapy': {
    en: 'Individual and Couple Therapy',
    fr: 'Thérapie individuelle et de couple',
    vi: 'Liệu pháp cá nhân và cặp đôi',
    zh: '个人和夫妇治疗',
  },
  Psychotherapist: {
    en: 'Psychotherapist',
    fr: 'Psychothérapeute',
    vi: 'Nhà trị liệu tâm lý',
    zh: '心理治疗师',
  },
  'Art therapist': {
    en: 'Art therapist',
    fr: 'Art-thérapeute',
    vi: 'Nhà trị liệu nghệ thuật',
    zh: '艺术治疗师',
  },
  Optometrist: {
    en: 'Optometrist',
    fr: 'Optométriste',
    vi: 'Bác sĩ đo thị lực',
    zh: '验光师',
  },
  Acupuncturist: {
    en: 'Acupuncturist',
    fr: 'Acupuncteur',
    vi: 'Bác sĩ châm cứu',
    zh: '针灸师',
  },
  Kinesiologist: {
    en: 'Kinesiologist',
    fr: 'Kinésiologue',
    vi: 'Chuyên gia động tác học',
    zh: '运动学家',
  },
  'Clinical psychologist': {
    en: 'Clinical psychologist',
    fr: 'Psychologue clinicien',
    vi: 'Nhà tâm lý học lâm sàng',
    zh: '临床心理学家',
  },
  'Guidance counselor and clinical nurse': {
    en: 'Guidance counselor and clinical nurse',
    fr: "Conseiller d'orientation et infirmière clinicienne",
    vi: 'Cố vấn hướng dẫn và điều dưỡng lâm sàng',
    zh: '指导咨询师和临床护士',
  },
} as const

export type ProfessionKey = keyof typeof occupationMappings
export type Language = 'en' | 'fr' | 'vi' | 'zh'

export function getProfessionLabel(profession: string, language: Language = 'en'): string {
  const mapping = occupationMappings[profession as ProfessionKey]
  return mapping ? mapping[language] : profession
}
