import { User } from "@/app/lib/definitions";
import { Metadata } from 'next';
import Image from "next/image";
export const metadata: Metadata = {
  title: 'Account Creation',
};

export default function AccountCreation({name, email, image} : User) {
	const formSubmission = async(e:any) => {
		e.preventDefault()

		const formValues = new FormData(e.target);

		const userData = {
			name: formValues.get('name'),
			email: formValues.get('email'),
            image: formValues.get('image')
		}
        console.log(userData)
		

		try{
			const results = await fetch('/api/createUser/', {
				method:'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({User: userData})
			})
			if (results){
				window.location.reload()
			}
		}catch(error:any){
			console.error({message:'Error: could not create new user.'})
		}
	}

	return (
		<>
			<div className="flex flex-col items-center justify-center gap-4 p-16 bg-extra-light-orange rounded-xl md:gap-10">
				<div>
					<h1 className='text-center text-3xl'>Create Your Account</h1>
					<p className='text-center mt-5 mb-1 text-lg text-red'>If you leave this page without completing the below form, your account will not be created.</p>
				</div>

				<form id="creationForm" onSubmit={formSubmission}>
					<fieldset className="flex flex-col gap-2 col-span-1 items-center">
							<label className="w-full" htmlFor="image" >Profile Picture:</label>
							<Image src={image} alt="profile picture" width={100} height={100} className="rounded-full"/>
							<input className="w-80 rounded hidden" name="image" type="text" id="image" value={image} readOnly required/>
							<label className="w-full" htmlFor="name" >Full Name:</label>
							<input className="w-80 rounded" name="name" type="text" id="name" value={name} readOnly required/>

							<label className="w-full" htmlFor="email" >Email:</label>
							<input className="w-80 rounded" name="email" type="email" id="email" value={email} readOnly required/>

							

						<button className="border border-gray bg-light-orange border-solid p-2 h-fit w-fit rounded" id="submit" type="submit">Create Account!</button>
					</fieldset>
				</form>
			</div>
		</>
	)
}