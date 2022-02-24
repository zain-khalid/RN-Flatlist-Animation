import React from 'react';
import { Animated, View } from 'react-native';
import { Box, FlatList, Heading, Text, Image, Badge, HStack } from 'native-base';
import MaskedView from '@react-native-community/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Rect } from 'react-native-svg';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

// import sample data
import DATA from '../../../assets/sampleData/moviedata.json';

// import styling & constraints
import styles, { SPACING, ITEM_SIZE, width, height, BACKDROP_HEIGHT} from './styles';

const List = () => {

	const scrollx = React.useRef(new Animated.Value(0)).current;

	const [movies, setMovies] = React.useState([{title:'left-spacer'}, ...DATA.slice(0, 10), {title:'right-spacer'}]);

	const Item = ({item, index}) => {

		if (!item.info) {
			return (
				<View style={styles.emptyContainer} />
			);
		}

		const inputRange = [
			( index - 2 ) * ITEM_SIZE,
			( index - 1 ) * ITEM_SIZE,
			index * ITEM_SIZE,
		];
		const translateY = scrollx.interpolate({
			inputRange,
			outputRange: [100, 10, 100]
		});

		return (
			<Box 
				width={ITEM_SIZE}
				p={SPACING*0.5}
			>
				<Animated.View
					style={{
						transform: [{ translateY }]
					}}
				>
					<Box 
						bgColor={'primary.0'}
						borderRadius={SPACING}
						p={SPACING*0.5} 
					>
						<Box>
							<Image
								borderRadius={SPACING}
								source={{
									uri: item.info.image_url.replace('http:', 'https:')
								}}
								alt={item.title}
								style={styles.imageContainer}
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
					</Box>
				</Animated.View>
			</Box>
		);
	};

	const DropItem = ({item, index, scrollx}) => {
		if (!item.info) return null;

		const inputRange = [
			( index - 2 ) * ITEM_SIZE,
			( index - 1 ) * ITEM_SIZE,
		];

		const translateX = scrollx.interpolate({
			inputRange,
			outputRange: [
				-width, 0
			]
		});

		return (
			<MaskedView 
				style={{position:'absolute'}}
				maskElement={
					<AnimatedSvg
						width={width}
						height={height}
						viewBox={`0 0 ${width} ${height}`}
						style={{transform: [{translateX}]}}
					>
						<Rect
							x={'0'} 
							y={'0'}
							width={width}
							height={height}
							fill={'red'}
						/>
					</AnimatedSvg>
				}
			>
				<Image
					source={{
						uri: item.info.image_url.replace('http:', 'https:')
					}}
					alt={item.title}
					style={styles.maskImageContainer}
					resizeMode={'cover'}
				/>
			</MaskedView>
		);
	};

	const BackDrop = ({movies, scrollx}) => {
		return (
			<View
				style={styles.backDropContainer}
			>
				<FlatList
					data={movies}
					removeClippedSubviews={false}
					contentContainerStyle={{ width, height: BACKDROP_HEIGHT }}
					renderItem={({item, index})=> <DropItem item={item} index={index} scrollx={scrollx} />}
					keyExtractor={(item)=>item.title.replace(' ', '-').toString()}
				/>
				<LinearGradient 
					colors={['transparent', 'white']}
					style={styles.linearContainer}
				/>
			</View>
		);
	};

	return(
		<View>
			<View style={{flex:1}}>
				<BackDrop movies={movies} scrollx={scrollx} />
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