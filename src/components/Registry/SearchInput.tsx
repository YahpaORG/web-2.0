'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type FormValues = z.infer<typeof formSchema>

const formSchema = z.object({
  term: z.string().min(3),
})

export default function SearchInput() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      term: searchParams.get('query')?.toString(),
    },
  })

  const handeOnSubmit = (values: FormValues) => {
    console.log('searchTerm', values)
  }

  const handleInputChange = () => {
    const formValues = form.getValues()
    const params = new URLSearchParams(searchParams)

    if (formValues.term) {
      params.set('query', formValues.term)
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handeOnSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="term"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter a name or profession</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="example@yahpa.org"
                    {...field}
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e)
                      handleInputChange()
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}
