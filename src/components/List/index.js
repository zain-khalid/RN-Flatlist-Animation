import React from 'react';
import { Dimensions, Animated, View } from 'react-native';
import { Box, FlatList, Heading, Text, Image, Badge, HStack } from 'native-base';

// import sample data
import DATA from '../../../assets/sampleData/moviedata.json';

// import styling 
import styles from './styles';


// define constraints
const {width, height} = Dimensions.get('window');
const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.65;

const List = () => {

	const scrollx = React.useRef(new Animated.Value(0)).current;

	const [movies, setMovies] = React.useState([{title:'left-spacer'}, ...DATA.slice(0, 10), {title:'right-spacer'}]);

	const Item = ({item, index}) => {

		if (!item.info) {
			return (
				<View style={{width: EMPTY_ITEM_SIZE}} />
			);
		}

		const inputRange = [
			( index - 2 ) * ITEM_SIZE,
			( index - 1 ) * ITEM_SIZE,
			index * ITEM_SIZE,
		];
		const translateY = scrollx.interpolate({
			inputRange,
			outputRange: [0, -50, 0]
		});

		return (
			<Box 
				shadow={2}
				px={SPACING} 
				py={SPACING} 
				width={ITEM_SIZE} 
			>
				<Animated.View
					style={{
						transform: [{ translateY }]
					}}
				>
					<Box >
						<Image
							borderRadius={SPACING}
							source={{
								uri: item.info.image_url.replace('http:', 'https:')
							}}
							alt={item.title}
							style={{
								width: ITEM_SIZE,
								height: ITEM_SIZE
							}}
							resizeMode={'stretch'}
						/>
					</Box>
					<Heading size={'xs'}>{item.title}</Heading>
					<HStack space={2} justifyContent="center">
						{
							item.info.genres.slice(0,2).map((actor, key)=>{
								return (
									<Badge 
										key={key}
										alignSelf="center"
										variant={'outline'}
									>{actor}</Badge>
								);
							})
						}
					</HStack>
					<Text fontSize={10} noOfLines={3}>{item.info.plot}</Text>
				</Animated.View>
			</Box>
		);
	};
	return(
		<View>
			<View style={{flex:1}}>
				<Animated.FlatList
					data={movies}
					bounces={false}
					horizontal={true}
					renderItem={Item}
					declarationRate={0}
					snapToInterval={ITEM_SIZE}
					showsHorizontalScrollIndicator={false}
					keyExtractor={(item)=>item.title.replace(' ', '-').toString()}
					contentContainerStyle={{ alignItems: 'center' }}
					scrollEventThrottle={16}
					onScroll={Animated.event(
						[{nativeEvent: {contentOffset: {x: scrollx}}}],
						{useNativeDriver: true}
					)}
				/>
			</View>
		</View>
	);
};


export default List;