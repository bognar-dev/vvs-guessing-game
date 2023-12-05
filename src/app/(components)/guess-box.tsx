"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

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
import { Station } from "../(types)/station";
import { toast } from "@/components/ui/use-toast"
import { useState } from "react"


interface GuessBoxProps {
 
    handleGuess: (guess:string) => void;
}


const formSchema = z.object({
    guess: z.string().min(2, {
        message: "Your guess must be at least 2 characters long.",
    }),
})

export function ProfileForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            guess: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        toast({ title: "Hurra!", description: `Du hast die Station ${values.guess} erraten!` })
    }

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="guess"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Station" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}


const GuessBox: React.FC<GuessBoxProps> = ({ handleGuess }) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            guess: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        handleGuess(values.guess)
    }

    return (
    

            <Form {...form}  >
                <form onSubmit={form.handleSubmit(onSubmit)}  className="z-10 left-1/4 top-1/4 md:left-1/3 md:top-1/4 absolute rounded-full bg-white ">
                    <FormField
                    
                        control={form.control}
                        
                        name="guess"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input  autoComplete="off" placeholder="Station (Enter to guess)" {...field} />
                                </FormControl>
                                
                            </FormItem>
                        )}
                    />
                    
                </form>
            </Form>

    );
};

export default GuessBox;
