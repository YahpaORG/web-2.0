import { registryData } from '@/data/registryData'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import 'dotenv/config'

const languageMap: Record<string, string> = {
    '廣東話': '67fc61dda3423800df69221f',
    'Filipino': '67fc5fcbc2c049463582b5b5',
    'ភាសាខ្មែរ': '67fc5fb6c2c049463582b5b2',
    '简体中文': '67fc5f9bc2c049463582b5af',
    '한국어': '67fc5f7dc2c049463582b5ac',
    '한국어 ': '67fc5f7dc2c049463582b5ac', // trailing space variant in data
    'Français': '67fc4f5cba2f0bdc13054a3f',
    'English': '67fc4f4bba2f0bdc13054a3c',
    'Tiếng Việt': '67fc4f3bba2f0bdc13054a39',
    '日本語': '6a2610893d567584470ba6a2',
    'ਪੰਜਾਬੀ': '6a2610b43d567584470ba6d1',
    'हिन्दी': '6a2610d03d567584470ba6f8',
    '潮州話': '6a26115d3d567584470ba727',
    '臺語': '6a2611913d567584470ba752',
}

const professionMap: Record<string, string> = {
    'Acupuncturist': 'acupuncturist',
    'Art therapist': 'art_therapist',
    'Art Therapist': 'art_therapist',
    'Audiologist': 'audiologist',
    'Chiropractor': 'chiropractor',
    'Dentist': 'dentist',
    'Dietitian': 'dietitian',
    'Dietitian/Nutritionist': 'dietitian',
    'Denturologist': 'denturologist',
    'Occupational Therapist': 'occupational_therapist',
    'Nurse': 'nurse',
    'Kinesiologist': 'kinesiologist',
    'Massage Therapist': 'massage_therapist',
    'Physician': 'physician',
    'Psychiatry': 'physician',
    'Optometrist': 'optometrist',
    'Osteopath': 'osteopath',
    'Pharmacist': 'pharmacist',
    'Podiatrist': 'podiatrist',
    'Physiotherapist': 'physiotherapist',
    'Psychologist': 'psychologist',
    'Clinical psychologist': 'psychologist',
    'Psychotherapist': 'psychotherapist',
    'Sexologist / Psychotherapist': 'psychotherapist',
    'Individual and Couple Therapy': 'psychotherapist',
    'Social Worker': 'social_worker',
    'Speech Language Pathologist': 'speech_language_pathologist',
    'Guidance counselor and clinical nurse': 'nurse',
}

async function seed() {
  const payload = await getPayload({ config: configPromise })

  console.log(`Seeding ${registryData.length} registry members...`)

  let created = 0
  let skipped = 0
  const errors: { name: string; error: string }[] = []

  for (const member of registryData) {
    const fullName = `${member.firstName} ${member.lastName}`

    // Skip members with no email
    if (!member.email?.trim()) {
      console.log(`⚠️  Skipping ${fullName} — no email`)
      skipped++
      continue
    }

    // Map languages
    const languageIds = member.languages
      .map((lang) => languageMap[lang.trim()])
      .filter(Boolean) as string[]

    if (languageIds.length === 0) {
      console.log(`⚠️  Skipping ${fullName} — no matching languages`)
      skipped++
      continue
    }

    // Map profession
    const profession = professionMap[member.profession?.trim()]
    if (!profession) {
      console.log(`⚠️  Skipping ${fullName} — unmapped profession: ${member.profession}`)
      skipped++
      continue
    }

    const loginEmail = (member as any).accountEmail?.trim() || member.email.trim()

    // Skip if already created (allows safe re-runs)
    const existing = await payload.find({
      collection: 'users',
      overrideAccess: true,
      where: { email: { equals: loginEmail } },
    })

    if (existing.totalDocs > 0) {
      console.log(`⏭️  Skipping ${fullName} — already exists`)
      skipped++
      continue
    }

    try {
      await payload.create({
        collection: 'users',
        overrideAccess: true,
        data: {
          email: loginEmail,
          password: crypto.randomUUID(),
        },
      })

      // 2. Create registry member entry
      await payload.create({
        collection: 'registry-members',
        overrideAccess: true,
        data: {
          firstName: member.firstName,
          lastName: member.lastName,
          email: member.email.trim(),
          primaryPhoneNumber: member.primaryPhoneNumber?.trim() || undefined,
          preferredContactMethod: 'email',
          practiceInfo: {
            name: member.workplace?.trim() || undefined,
            address: member.address?.trim() || undefined,
            website: member.website?.trim() || undefined,
          },
          languages: languageIds,
          jobStatus: 'practitioner',
          profession: profession as any,
          isAcceptingPatients: 'yes',
          consentToWebsite: true,
          consentToReferrals: false,
        },
      })

      // 3. Send password reset email so they can claim their account
      // await payload.forgotPassword({
      //     collection: 'users',
      //     data: { email: loginEmail },
      //     disableEmail: false,
      // })

      console.log(`✓ Created ${fullName}`)
      created++
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e)
      console.log(`✗ Failed ${fullName}: ${message}`)
      errors.push({ name: fullName, error: message })
    }
  }

  console.log(`\nDone! Created: ${created}, Skipped: ${skipped}, Errors: ${errors.length}`)
  if (errors.length > 0) {
    console.log('\nFailed entries:')
    errors.forEach(({ name, error }) => console.log(`  - ${name}: ${error}`))
  }

  process.exit(0)
}

seed()