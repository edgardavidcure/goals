import { ReactElement } from 'react';
import Loader from '../loader';
const checkIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
<path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
</svg>

const shareIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
<path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
</svg>

const scheduleIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
<path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
</svg>


interface OfferCardProps {
    icon: ReactElement;
    header: string;
    subHeader: string;
  }
  
function OfferCard({icon, header, subHeader}: OfferCardProps){
    return (
        <div className="flex flex-col flex-1 h-52 min-w-44 items-start justify-start px-5 py-8 shadow-lg bg-white rounded-lg ">
                <div className='mb-2 self-center w-50'>{icon}</div>
                <h5 className="my-2 text-start text-lg font-bold tracking-tighter md:text-2xl lg:text-2xl/none">{header}</h5>
                <p className='text-sm'>{subHeader}</p>
            </div>
    )
}

export default function Section(){
    return (
        <section className='px-10 bg-extra-light-orange py-12'>
            <h2 className='my-3'>What You Get</h2>
            <p>Our Platform offers a variety of features to help you track and achieve your goals.</p>
            <div className="flex w-full gap-8 items-center justify-evenly flex-wrap my-10">
                <OfferCard icon={checkIcon} header="Goal Tracking" subHeader="Track your progress towards your goals." />
                <OfferCard icon={shareIcon} header="Goal Sharing" subHeader="Share your goals with others." />
                <OfferCard icon={scheduleIcon} header="Scheduling" subHeader="Schedule tasks and reminders to keep you on track." />
            </div>
            
            

        </section>
    )
}

