"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
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

interface GuessBoxProps {

    handleGuess: (guess: string) => boolean;
}


const formSchema = z.object({
    guess: z.string().min(2, {
        message: "Your guess must be at least 2 characters long.",
    }),
})



const GuessBox: React.FC<GuessBoxProps> = ({ handleGuess }) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            guess: "",
        },
        
        

    })

  /*   const onSubmit =  (values : z.infer<typeof formSchema>) => {
        console.log(values.guess)
        const val = form.getValues();
        const del = handleGuess(val.guess)
        console.log(val.guess)
        if (del) {
            
        }
    } */

    return (


        <Form  {...form} >
            <form onSubmit={async (e) => {
                //form.handleSubmit(onSubmit)
                const val = form.getValues();
                const del = handleGuess(val.guess)
                if (del) {
                    form.resetField("guess")
                }
                
                e.preventDefault()
            }}
                className="z-10 left-1/2  top-1/2 lg:top-1/4 transform -translate-x-1/2 md:-translate-y-1/2  lg:-translate-x-72 absolute rounded-full bg-white ">
                <FormField

                    control={form.control}

                    name="guess"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input autoComplete="off" placeholder="Station (Enter to guess)"  {...field} />
                            </FormControl>

                        </FormItem>
                    )}
                />

            </form>
        </Form>

    );
};

export default GuessBox;
