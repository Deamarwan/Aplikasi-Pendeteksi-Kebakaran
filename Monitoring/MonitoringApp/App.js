import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ImageBackground, StatusBar, Image, Dimensions  } from 'react-native';
import Icon from "react-native-vector-icons/Feather";
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Width = Dimensions.get('window').width;

const App = () => {

   

   

  

    const [kelembaban, setKelembaban] =  useState(0)
    const [temperatur, setTemperatur] =  useState(0)
    const [gas, setGas] =  useState(0)
    const [notifasap, setnotifasap] =  useState(false)
    const [notifsuhu, setnotifsuhu] =  useState(false)

    useEffect(() => {
        const refreshData = setInterval(() => {
            ambilData();
           
           
        }, 3000);
      
    }, [])

    
    
    async function ambilData() {
        return fetch('http://192.168.43.137/Monitoring/tampil.php')
            .then(response => response.json())
            .then(async function (data){
                if (data.status === 200) {
                    setKelembaban(data.data[0].kelembapan);
                    setTemperatur(data.data[0].temperatur);
                    setGas(data.data[0].gas);

                    const g = data.data[0].gas;
                    const t = data.data[0].temperatur;

                    if(g > 150){
                        setnotifasap(true)
                    }else{
                        setnotifasap(false)
                    }
                
                    if(t > 40){
                        setnotifsuhu(true)
                    }else{
                        setnotifsuhu(false)
                    }
                }
            })
            .catch(error => {
                console.log(JSON.stringify(error.message));
            });
    }

    const dataMonitoring = [
        {
            'id': 1,
            'title': 'KELEMBAPAN RUANGAN',
            'subtitle':`${kelembaban}`,
            'background': ['#22c55e', '#16a34a'],
            'image': require('./assets/humidity.png'),
        },
        {
            'id': 2,
            'title': 'SUHU RUANGAN',
            'subtitle': `${temperatur}`,
            'background': ['#4f46e5', '#4338ca'],
            'image': require('./assets/hot.png'),
        },
        {
            'id': 3,
            'title': 'ASAP / GAS',
            'subtitle': `${gas}`,
            'background': ['#7c3aed', '#7e22ce'],
            'image': require('./assets/smoke.png'),
        },
    ]


    function renderItem({ item }) {
        return (
            <LinearGradient
                key={item.id}
                colors={item.background}
                className="w-full h-[120px] flex flex-row items-center p-6 mb-6 rounded-md"
            >
                <Image source={item.image} className="w-[50px] h-[50px]" />
                <View className="ml-6">
                    <Text className="font-medium text-5xl text-white uppercase">{item.subtitle}</Text>
                    <Text className="font-medium text-base text-white uppercase">{item.title}</Text>
                </View>
            </LinearGradient>
        )
    }


    return (
        <ImageBackground
            source={require('./assets/bg.jpg')}
            resizeMode='cover'
            className="flex-1"
        >
            <StatusBar barStyle={'light-content'} backgroundColor={'transparent'} translucent />

            { 
                notifasap ? (
                    <View className="absolute px-6 py-4 flex flex-row items-center bg-white  z-50  mt-6 mx-6 rounded-lg"  style={{ width: Width - 54}}>
                        <Icon name="bell" size={24} color={'red'} />
                    <View>
                    <Text className="text-base font-medium text-slate-500 ml-3">Gas atau asap terlalu tinggi</Text>
                    <Text className="text-sm font-medium text-slate-400 ml-3">Silhakan netralkan dulu gas atau asap pada ruangan anda !</Text>
                    </View>
                </View>
                ): (
                    notifsuhu ? (
                        <View className="absolute px-6 py-4 flex flex-row items-center bg-white  z-50  mt-6 mx-6 rounded-lg"  style={{ width: Width - 54}}>
                            <Icon name="bell" size={24} color={'red'} />
                            <View>
                            <Text className="text-base font-medium text-slate-500 ml-3">Suhu ruangan terlalu tinggi</Text>
                            <Text className="text-sm font-medium text-slate-400 ml-3">Silhakan netralkan dulu suhu ruangan anda !</Text>
                            </View>
                        </View>
                    ) : null
                )
            }
            <View className="flex flex-row items-center bg-green-600 pt-12 px-6 pb-3">
                <Image
                    source={require('./assets/logo.png')}
                    resizeMode='cover'
                    className="w-[50px] h-[50px] rounded mr-4"
                />
                <View>
                    <Text className="font-medium text-base text-white uppercase">Monitoring lab</Text>
                    <Text className="font-medium text-base text-white uppercase">politeknik negeri ketapang</Text>
                </View>
            </View>
            <FlatList
                keyExtractor={(dataMonitoring) => dataMonitoring.id}
                data={dataMonitoring}
                renderItem={renderItem}
                contentContainerStyle={{ padding: 12 }}
                className="absolute w-screen h-screen z-50 mt-[150px]"
            />
        </ImageBackground>
    )
}

export default App