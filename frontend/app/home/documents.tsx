import AccordionItem from '@/components/AccordionItem';
import Title from '@/components/Title';
import TopBar from '@/components/TopBar';
import { global } from '@/lib/context';
import { Redirect, useRouter } from 'expo-router';
import { speak } from 'expo-speech';
import { useContext, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Documents() {
	const router = useRouter();
	const { user } = useContext(global);
	const [selected, setSelected] = useState<number | null>(null);
	const [language, setLanguage] = useState<'English' | 'Spanish'>('English');

	if (!user) return <Redirect href="/" />;

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
							<View style={styles.tts}>
								<SelectDropdown
									data={['English', 'Spanish']}
									defaultValue="English"
									onSelect={setLanguage}
									dropdownStyle={{ backgroundColor: 'transparent' }}
									renderButton={(language, open) => (
										<View style={{ ...styles.dropdown, ...(open ? styles.open : {}) }}>
											<Text style={{ fontSize: 18, color: 'black' }}>{language}</Text>
											<Icon name={open ? 'chevron-up' : 'chevron-down'} size={16} />
										</View>
									)}
									renderItem={(language, i, selected) => (
										<View style={{ ...styles.dropdownItem, ...(i === 0 ? styles.dropdownItemLast : {}) }}>
											{selected && <Icon name="checkmark-outline" size={16} />}
											<Text style={{ fontSize: 18, color: 'black' }}>{language}</Text>
										</View>
									)}
								/>
								<TouchableOpacity style={styles.btn} onPress={() => speak(proc.explanation.explanation)}>
									<Text style={{ color: 'white', fontSize: 18 }}>Listen</Text>
								</TouchableOpacity>
							</View>
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
		fontSize: 24,
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
	},
	tts: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: 16
	},
	btn: {
		backgroundColor: '#6C63FF',
		paddingTop: 12,
		paddingBottom: 12,
		paddingLeft: 24,
		paddingRight: 24,
		borderRadius: 20
	},
	dropdown: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#E2E0FF',
		flexBasis: 1,
		flexGrow: 1,
		borderRadius: 16,
		paddingTop: 12,
		paddingBottom: 12,
		paddingLeft: 24,
		paddingRight: 24
	},
	dropdownItem: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		backgroundColor: '#E2E0FF',
		paddingTop: 12,
		paddingBottom: 12,
		paddingLeft: 24,
		paddingRight: 24
	},
	dropdownItemLast: {
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16
	},
	open: {
		borderTopLeftRadius: 0,
		borderTopRightRadius: 0
	}
});

