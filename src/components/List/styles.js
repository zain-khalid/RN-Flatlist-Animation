import { StyleSheet, Dimensions, Platform } from 'react-native';

// define constraints
export const {width, height} = Dimensions.get('window');
export const SPACING = 10;
export const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
export const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
export const BACKDROP_HEIGHT = height * 0.65;

const styles = StyleSheet.create({
	backDropContainer:{
		position: 'absolute',
		width,
		height: BACKDROP_HEIGHT
	},
	emptyContainer:{
		width: EMPTY_ITEM_SIZE
	},
	imageContainer:{
		width: ITEM_SIZE,
		height: ITEM_SIZE
	},
	maskImageContainer:{
		width,
		height: BACKDROP_HEIGHT
	},
	linearContainer:{
		width,
		height: BACKDROP_HEIGHT,
		position: 'absolute',
		bottom: 0
	}
});

export default styles;