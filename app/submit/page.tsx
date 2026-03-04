'use client'
import { Metadata } from 'next'
import { useState } from 'react'
import { toast } from 'sonner'
import PageTransition from '@/components/PageTransition'

export const metadata: Metadata = {
  title: 'Submit a Resource',
  description: 'Share a Web3 Resource with the community'
}


// These match the categories in your resources.json
const CATEGORIES = ['DeFi', 'NFTs', 'Gaming', 'Infra', 'DAO', 'DevTools']

// This defines the shape of our form data
type FormData = {
  name: string
  url: string
  category: string
  tags: string
  description: string
}

// This defines which fields have errors
type FormErrors = Partial<Record<keyof FormData, string>>

export default function SubmitPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    url: '',
    category: '',
    tags: '',
    description: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Updates a single field in formData without touching the others
  // [field] is a computed property key — it dynamically uses the field name as the key
  function handleChange(field: keyof FormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear the error for this field as soon as the user starts typing
    // This gives instant feedback that their correction was noticed
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  function validate(): boolean {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Resource name is required'
    }

    if (!formData.url.trim()) {
      newErrors.url = 'URL is required'
    } else {
      // Try to parse the URL — if it throws, the URL format is invalid
      try {
        new URL(formData.url)
      } catch {
        newErrors.url = 'Please enter a valid URL (e.g. https://example.com)'
      }
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    } else if (formData.description.trim().length < 20) {
      newErrors.description = 'Description must be at least 20 characters'
    }

    setErrors(newErrors)

    // Returns true only if there are zero errors
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    // Prevents the browser's default form submission behavior (page reload)
    e.preventDefault()

    // Stop here if validation fails
    if (!validate()) {
      toast.error('Please fix the errors before submitting')
      return
    }

    setIsSubmitting(true)

    // Simulating an API call with a 1.5 second delay
    // In a real app you'd send this to your backend here
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast.success('Resource submitted successfully! We will review it shortly.')
    setIsSubmitting(false)

    // Reset the form after successful submission
    setFormData({ name: '', url: '', category: '', tags: '', description: '' })
    setErrors({})
  }

  return (
    <PageTransition>
      <div className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
          Submit a Resource
        </h1>
        <p className="mb-8 text-gray-500 dark:text-gray-400">
          Know a great Web3 resource? Share it with the community.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
          {/* Resource Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Resource Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Uniswap Documentation"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={`rounded-lg border px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-900 dark:text-white ${errors.name
                ? 'border-red-500'
                : 'border-gray-200 dark:border-gray-700'
                }`}
            />
            {/* Inline error — only shows if this field has an error */}
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name}</p>
            )}
          </div>

          {/* URL */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              placeholder="https://example.com"
              value={formData.url}
              onChange={(e) => handleChange('url', e.target.value)}
              className={`rounded-lg border px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-900 dark:text-white ${errors.url
                ? 'border-red-500'
                : 'border-gray-200 dark:border-gray-700'
                }`}
            />
            {errors.url && (
              <p className="text-xs text-red-500">{errors.url}</p>
            )}
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className={`rounded-lg border px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-900 dark:text-gray-300 ${errors.category
                ? 'border-red-500'
                : 'border-gray-200 dark:border-gray-700'
                }`}
            >
              <option value="">Select a category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-xs text-red-500">{errors.category}</p>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Tags{' '}
              <span className="text-gray-400 font-normal">(optional, comma separated)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. DeFi, Beginner, Solidity"
              value={formData.tags}
              onChange={(e) => handleChange('tags', e.target.value)}
              className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              placeholder="Briefly describe what this resource covers and who it's for..."
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className={`rounded-lg border px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-900 dark:text-white ${errors.description
                ? 'border-red-500'
                : 'border-gray-200 dark:border-gray-700'
                }`}
            />
            {/* Character count helper */}
            <div className="flex items-center justify-between">
              {errors.description ? (
                <p className="text-xs text-red-500">{errors.description}</p>
              ) : (
                <span />
              )}
              <p className="text-xs text-gray-400">
                {formData.description.length} characters
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Resource'}
          </button>
        </form>
      </div>
    </PageTransition>
  )
}