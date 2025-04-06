import { View, Text } from 'react-native';
import Modal from '@/components/Modal';
import { useRouter } from 'expo-router';
import OnboardFirst from '@/components/OnboardFirst';
import OnboardThird from '@/components/OnboardThird';
import OnboardSecond from '@/components/OnboardSecond';

const Onboarding = () => {
    const router = useRouter();

	return <Modal open onClose={() => {router.replace('/home')}} phases={[<OnboardFirst/>, <OnboardSecond/>, <OnboardThird/>]} />;
};

export default Onboarding;
