import React from "react";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";

// const formSchema = z.object({
//   name: z.string().min(2, {
//     message: "Enter a agent name",
//   }),
//   system_message: z.string().min(2, {
//     message: "Enter a system message",
//   }),
//   is_termination_msg: z.string(),
//   max_consecutive_auto_reply: z.number(),
//   human_input_mode: z.enum(["ALWAYS", "NEVER", "TERMINATE"]),
//   function_map: z.string().min(2, {
//     message: "Select a model",
//   }),
//   code_execution_config: z.string().min(2, {
//     message: "Select a model",
//   }),
//   llm_config: z.union([
//     z.record(z.any()), // You can use a more specific type here if needed
//     z.boolean(),
//   ]),
//   default_auto_reply: z.union([
//     z.string(),
//     z.record(z.any()), // You can use a more specific type here if needed
//     z.null(),
//   ]),
// });

const formSchema = z.object({
  agent_type: z.enum([
    "user_proxy_agent",
    "assistant_agent",
    "conversable_agent",
  ]),
  name: z.string().min(1, { message: "Enter a agent name" }),
  system_message: z.string().min(1, { message: "Enter a system message" }),
});

export default function AgentForm({ closePopup }: { closePopup: () => void }) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agent_type: "assistant_agent",
      name: "",
      system_message: "",
    },
    // defaultValues: {
    //   agent_type: "assistant_agent",
    //   name: "",
    //   system_message: "",
    //   is_termination_msg: "",
    //   max_consecutive_auto_reply: 0,
    //   human_input_mode: "ALWAYS",
    //   function_map: "",
    //   code_execution_config: "",
    //   llm_config: false,
    //   default_auto_reply: "",
    // },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Successfully Added Agent",
      description: "Your agent has been successfully added.",
    });

    closePopup();

    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input required placeholder="e.g. Coder" {...field} />
              </FormControl>
              <FormDescription>What is the name of this agent</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="agent_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
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
                    <SelectItem value="user_proxy_agent">
                      user_proxy_agent
                    </SelectItem>
                    <SelectItem value="assistant_agent">
                      assistant_agent
                    </SelectItem>
                    <SelectItem value="conversable_agent">
                      conversable_agent
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="system_message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>System Message</FormLabel>
              <FormControl>
                <Textarea required placeholder="e.g. Coder.." {...field} />
              </FormControl>
              <FormDescription>What should the agent do</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Add Agent</Button>
      </form>
    </Form>
  );
}
