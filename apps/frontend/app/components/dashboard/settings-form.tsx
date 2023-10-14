import React from 'react';
import {
  Form,
  Input,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  useToast,
  Button,
} from '@agentsflow/ui-components';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  apiKey: z.string().min(2, {
    message: 'Enter a valid api key',
  }),
  model: z.string().min(2, {
    message: 'Select a model',
  }),
});

export default function SettingsForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiKey: localStorage.getItem('apiKey') || '',
      model: localStorage.getItem('model') || '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: 'Settings Successfully Saved',
      description: 'Your settings have been successfully saved.',
    });

    localStorage.setItem('apiKey', values.apiKey);
    localStorage.setItem('model', values.model);

    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="apiKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>OpenAI API key</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="e.g. sk-...1234"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can get an API key here:{' '}
                <Link
                  className="text-primary"
                  href={'https://platform.openai.com/account/api-keys'}
                  target="_blank"
                >
                  OpenAI Api Key
                </Link>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="gpt-3.5-turbo">gpt-3.5-turbo</SelectItem>
                    <SelectItem value="gpt-35-turbo">gpt-35-turbo</SelectItem>
                    <SelectItem value="gpt-3.5-turbo-0613">
                      gpt-3.5-turbo-0613
                    </SelectItem>
                    <SelectItem value="gpt-3.5-turbo-16k-0613">
                      gpt-3.5-turbo-16k-0613
                    </SelectItem>
                    <SelectItem value="gpt-3.5-turbo-0301">
                      gpt-3.5-turbo-0301
                    </SelectItem>
                    <SelectItem value="gpt-4">gpt-4</SelectItem>
                    <SelectItem value="gpt-4-0314">gpt-4-0314</SelectItem>
                    <SelectItem value="gpt-4-32k-0314">
                      gpt-4-32k-0314
                    </SelectItem>
                    <SelectItem value="gpt-4-0613">gpt-4-0613</SelectItem>
                    <SelectItem value="gpt-4-32k-0613">
                      gpt-4-32k-0613
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}
