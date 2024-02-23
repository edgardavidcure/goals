import { Metadata } from 'next';
import Profile from './Profile';

export const metadata: Metadata = {
  title: 'User Profile',
};

export default function Page() {
	return (
		<Profile/>
	)
}