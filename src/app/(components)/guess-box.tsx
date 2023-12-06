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
                className="z-10 left-1/4 top-1/4 md:left-1/3 md:top-1/4 absolute rounded-full bg-white ">
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
