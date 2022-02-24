import React from 'react';
import { Dimensions } from 'react-native';
import { Box, FlatList, Heading, Center, Image } from 'native-base';

// import sample data
import DATA from '../../../assets/sampleData/moviedata.json';

// import styling 
import styles from './styles';


// define constraints
const {width} = Dimensions.get('window');

const SPACING = 10;

const ITEM_SIZE = width * 0.70;

const List = () => {

	const Item = ({item}) => {
		return (
			<Box width={ITEM_SIZE} px={SPACING} py={SPACING} shadow={2}>
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
			</Box>
		);
	};
	return(
		<Box>
			<FlatList
				data={DATA.slice(0,5)}
				keyExtractor={(item)=>item.title.replace(' ', '-').toString()}
				renderItem={Item}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
			/>
		</Box>
	);
};


export default List;