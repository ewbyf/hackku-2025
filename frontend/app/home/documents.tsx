import AccordionItem from '@/components/AccordionItem';
import Title from '@/components/Title';
import TopBar from '@/components/TopBar';
import { global } from '@/lib/context';
import { Redirect, useRouter } from 'expo-router';
import { useContext, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Documents() {
	const router = useRouter();
	const { user } = useContext(global);
	const [selected, setSelected] = useState<number | null>(null);

	if (!user) return <Redirect href="/login" />;

	return (
		<SafeAreaView style={styles.container}>
			<TopBar />
			<KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>
				<Title>Medical Records</Title>
				<View style={styles.list}>
					{user.procedures.map((proc, i) => (
						<AccordionItem
							short={
								<Text style={styles.summary} numberOfLines={1} minimumFontScale={0.66} adjustsFontSizeToFit allowFontScaling>
									{proc.explanation.technical}
								</Text>
							}
							opened={selected === i}
							onOpened={() => setSelected(i)}
							onClosed={() => setSelected(null)}
							key={i}>
							<Text style={styles.details}>{proc.explanation.explanation}</Text>
						</AccordionItem>
					))}
				</View>
			</KeyboardAwareScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flex: 1
	},
	summary: {
		color: 'white',
		fontSize: 30,
		textOverflow: 'ellipsis',
		overflow: 'hidden',
		maxWidth: 250
	},
	list: {
		display: 'flex',
		flexDirection: 'column',
		gap: 10
	},
	details: {
		fontSize: 18,
		lineHeight: 24
	}
});

