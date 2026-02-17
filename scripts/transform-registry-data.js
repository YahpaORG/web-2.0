#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

/**
 * Transform registry members data to UI-friendly format
 * Reads raw registry data and outputs simplified JSON for frontend use
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Define paths
const INPUT_FILE = process.argv[2] || path.join(__dirname, '../data/registry-members.json')
const OUTPUT_FILE = process.argv[3] || path.join(__dirname, '../data/registry-members-ui.json')

// Ensure output directory exists
const outputDir = path.dirname(OUTPUT_FILE)
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

try {
  // Read input file
  const rawData = fs.readFileSync(INPUT_FILE, 'utf-8')
  const parsedData = JSON.parse(rawData)

  // Handle both Storyblok format (with stories array) and MongoDB format (direct array)
  const registryMembers = parsedData.stories || parsedData

  // Transform data
  const uiData = registryMembers.map((member) => {
    // Support both formats: nested content (Storyblok) and flat structure (MongoDB)
    const content = member.content || member
    const fullName =
      content.name || `${content.firstName || ''} ${content.lastName || ''}`.trim() || ''

    // Extract firstName and lastName
    let firstName = content.firstName || ''
    let lastName = content.lastName || ''

    // If firstName/lastName not provided, extract from name
    if (!firstName && !lastName && fullName) {
      const nameParts = fullName.trim().split(' ')
      lastName = nameParts[nameParts.length - 1] || ''
      firstName = nameParts.slice(0, -1).join(' ') || ''
    }

    return {
      id: member._id?.$oid || member.id || member.uuid || '',
      firstName,
      lastName,
      fullName,
      email: content.email || '',
      primaryPhoneNumber: content.primaryPhoneNumber || content.phone_number || '',
      preferredContactMethod: content.preferredContactMethod || 'email',
      languages: content.languages || [],
      profession: content.profession || '',
      professionalOrder: content.professionalOrder || '',
      sector: content.sector || '',
      isAcceptingPatients: content.isAcceptingPatients || '',
      graduationDate: content.graduationDate?.$date || '',
      address: content.address || '',
      website: content.website || '',
      workplace: content.workplace || '',
      slug: member.slug || '',
    }
  })

  // Write output file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(uiData, null, 2))

  console.log(`✓ Transformed ${uiData.length} registry members`)
  console.log(`✓ Output written to: ${OUTPUT_FILE}`)
} catch (error) {
  console.error('✗ Error transforming data:')
  console.error(error.message)
  process.exit(1)
}
