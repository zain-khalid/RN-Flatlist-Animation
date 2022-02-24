import React from 'react';
import { NativeBaseProvider, extendTheme, Box, Container } from 'native-base';
import { List } from './src/components';

export default function App() {
	const theme = extendTheme({
		colors: {
			// Add new color
			primary: {
				50: '#F1F1F1',
				100: '#F2F2F2',
				200: '#F3F3F3',
				300: '#F4F4F4',
				400: '#F5F5F5',
				500: '#F6F6F6',
				600: '#F7F7F7',
				700: '#F8F8F8',
				800: '#F9F9F9',
			},
			// Redefinig only one shade, rest of the color will remain same.
			amber: {
				400: '#d97706',
			},
		}
	});
	
	return (
		<NativeBaseProvider theme={theme}>
			<Box safeArea alignItems="center" flex={1}>
				<List />
			</Box>
		</NativeBaseProvider>
	);
}