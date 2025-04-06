import AccordionItem from '@/components/AccordionItem';
import Title from '@/components/Title';
import TopBar from '@/components/TopBar';
import api from '@/lib/axiosConfig';
import { global } from '@/lib/context';
import { Redirect, useRouter } from 'expo-router';
import { pause, speak, resume, stop } from 'expo-speech';
import { useContext, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import { SelectList } from 'react-native-dropdown-select-list';

const data = [
	{ key: '1', value: 'English' },
	{ key: '2', value: 'Spanish' },
];

export default function Documents() {
	const router = useRouter();
	const { user } = useContext(global);
	const [selected, setSelected] = useState<number | null>(null);
	const [language, setLanguage] = useState<'English' | 'Spanish'>('English');

	const [playing, setPlaying] = useState(false);

	if (!user) return <Redirect href="/" />;

	return (
		<ImageBackground source={require('../../assets/images/bg.png')} imageStyle={{ resizeMode: 'cover' }} style={{ height: '100%', width: '100%' }}>
			<SafeAreaView style={styles.container}>
				<TopBar />
				<KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>
					<Title>Medical Records</Title>
					<View style={styles.list}>
						{user.procedures.map((proc, i) => (
							<AccordionItem
								short={
									<Text style={styles.summary} numberOfLines={2}>
										{proc.explanation.technical}
									</Text>
								}
								opened={selected === i}
								onOpened={() => setSelected(i)}
								onClosed={() => setSelected(null)}
								key={i}
							>
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

									<TouchableOpacity
										style={styles.btn}
										onPress={() => {
											if (playing) {
												pause();
												setPlaying(false);
											} else {
                                                setPlaying(true);
                                                stop()
												language === 'English'
													? speak(proc.explanation.explanation, { language: 'en' })
													: api
															.get(`/translate?language=Spanish&text=${proc.explanation.explanation}`)
															.then((res) => speak(res.data, { language: 'es-419' }));
											}
										}}
									>
										{/* <Text style={{ color: 'white', fontSize: 18 }}>Listen</Text> */}
										{!playing && <Icon name="play" size={24} color="white" />}
										{playing && <Icon name="pause" size={24} color="white" />}
									</TouchableOpacity>
								</View>
							</AccordionItem>
						))}
					</View>
				</KeyboardAwareScrollView>
			</SafeAreaView>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flex: 1,
	},
	summary: {
		color: 'white',
		fontSize: 24,
		fontFamily: 'SourceSemibold',
		maxWidth: 275,
	},
	list: {
		display: 'flex',
		flexDirection: 'column',
		gap: 10,
	},
	details: {
		fontFamily: 'Source',
		fontSize: 19,
		lineHeight: 28,
	},
	tts: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: 16,
	},
	btn: {
		backgroundColor: '#6C63FF',
		paddingTop: 12,
		paddingBottom: 12,
		paddingLeft: 24,
		paddingRight: 24,
		borderRadius: 10,
	},
	dropdown: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#E2E0FF',
		flexBasis: 1,
		flexGrow: 1,
		borderRadius: 10,
		paddingTop: 12,
		paddingBottom: 12,
		paddingLeft: 24,
		paddingRight: 24,
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
		paddingRight: 24,
	},
	dropdownItemLast: {
		// borderTopLeftRadius: 16,
		// borderTopRightRadius: 16,
	},
	open: {
		borderTopLeftRadius: 0,
		borderTopRightRadius: 0,
	},
});
