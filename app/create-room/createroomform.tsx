"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createRoomAction } from "./actions"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"



const formSchema = z.object({
  name: z.string().min(1).max(50),
  description:z.string().min(10).max(200),
  githubRepo:z.string().min(1).max(50),
  tags:z.string().min(0).max(50),
})

export function CreateRoomForm(){
  const router=useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description:"",
            githubRepo:"",
            tags:"",
        },
  })
  const {toast}=useToast()
  async function onSubmit(values: z.infer<typeof formSchema>) {
        //Todo :invoke the server to add info to dtabase
        await createRoomAction(values);
        toast({
          title:"Your room was created",
          description:"Your room was created",
        })
        router.push("/your-rooms")
    }
    return (
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input  {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input  {...field} />
                  </FormControl>
                  <FormDescription>
                    What's your room about
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="githubRepo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GithubRepo</FormLabel>
                  <FormControl>
                    <Input  {...field} />
                  </FormControl>
                  <FormDescription>
                    GitHUb Repo linked with the project
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input  placeholder="typescript,nextjs"{...field} />
                  </FormControl>
                  <FormDescription>
                    List the primary progrmaing tags you are using 
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
        
      )
}
