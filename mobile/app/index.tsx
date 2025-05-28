// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, Alert, Dimensions, Platform } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { getFare } from '../services/api';

// const passengerTypes = [
//   { label: 'Regular', value: 'regular' },
//   { label: 'Senior', value: 'senior' },
//   { label: 'PWD', value: 'pwd' },
//   { label: 'Student', value: 'student' },
// ];

// export default function FareScreen() {
//   const [MapView, setMapView] = useState<any>(null);
//   const [Marker, setMarker] = useState<any>(null);
//   const [startPoint, setStartPoint] = useState<{ latitude: number; longitude: number } | null>(null);
//   const [endPoint, setEndPoint] = useState<{ latitude: number; longitude: number } | null>(null);
//   const [passengerType, setPassengerType] = useState('regular');
//   const [fare, setFare] = useState<number | null>(null);

//   // Dynamically import react-native-maps only on native platforms
//   useEffect(() => {
//     if (Platform.OS !== 'web') {
//       import('react-native-maps').then((module) => {
//         setMapView(() => module.default);
//         setMarker(() => module.Marker);
//       });
//     }
//   }, []);

//   const handleMapPress = (event: any) => {
//     const coordinate = event.nativeEvent.coordinate;
//     if (!startPoint) {
//       setStartPoint(coordinate);
//     } else if (!endPoint) {
//       setEndPoint(coordinate);
//     } else {
//       // Reset and start over
//       setStartPoint(coordinate);
//       setEndPoint(null);
//       setFare(null);
//     }
//   };

//   const handleGetFare = async () => {
//     if (!startPoint || !endPoint) {
//       Alert.alert('Please select both start and end points on the map.');
//       return;
//     }

//     if (
//       startPoint.latitude === endPoint.latitude &&
//       startPoint.longitude === endPoint.longitude
//     ) {
//       Alert.alert('Start and end points cannot be the same.');
//       return;
//     }

//     try {
//       const result = await getFare(
//         startPoint.latitude.toString(),
//         startPoint.longitude.toString(),
//         endPoint.latitude.toString(),
//         endPoint.longitude.toString(),
//         passengerType
//       );

//       if (!result.error) {
//         setFare(result.fare);
//       } else {
//         Alert.alert('Failed to calculate fare.');
//       }
//     } catch (error) {
//       Alert.alert('Error calculating fare.');
//     }
//   };

//   const handleReset = () => {
//     setStartPoint(null);
//     setEndPoint(null);
//     setFare(null);
//   };

//   if (Platform.OS === 'web') {
//     // Fallback UI for web platform
//     return (
//       <View style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
//         <Text style={{ fontSize: 18, marginBottom: 10 }}>
//           Map selection is not supported on web yet.
//         </Text>
//         <Text>Please use a mobile device or emulator to access this feature.</Text>
//       </View>
//     );
//   }

//   if (!MapView || !Marker) {
//     // Loading state while MapView and Marker are dynamically imported
//     return (
//       <View style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>Loading map...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={{ flex: 1, padding: 10 }}>
//       <Text style={{ fontSize: 24, textAlign: 'center', marginBottom: 10 }}>
//         G! Fare Estimator - Map Selection
//       </Text>

//       <MapView
//         style={{ width: Dimensions.get('window').width - 20, height: 300, marginBottom: 10 }}
//         initialRegion={{
//           latitude: 7.0731,
//           longitude: 125.6125,
//           latitudeDelta: 0.05,
//           longitudeDelta: 0.05,
//         }}
//         onPress={handleMapPress}
//       >
//         {startPoint && <Marker coordinate={startPoint} pinColor="green" title="Start Point" />}
//         {endPoint && <Marker coordinate={endPoint} pinColor="red" title="End Point" />}
//       </MapView>

//       <Text>Passenger Type</Text>
//       <Picker
//         selectedValue={passengerType}
//         onValueChange={(itemValue) => setPassengerType(itemValue)}
//         style={{ height: 50, width: '100%' }}
//       >
//         {passengerTypes.map((type) => (
//           <Picker.Item key={type.value} label={type.label} value={type.value} />
//         ))}
//       </Picker>

//       <Button title="Calculate Fare" onPress={handleGetFare} />

//       {fare !== null && (
//         <Text style={{ fontSize: 20, marginTop: 15, textAlign: 'center' }}>
//           Estimated Fare: ₱{fare}
//         </Text>
//       )}

//       <Button title="Reset Selection" onPress={handleReset} color="gray" />
//     </View>
//   );
// }
