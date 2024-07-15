import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import style from './style';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {gray, green} from '../../shared/styleConstants';
import { useState } from 'react';

export default function BalanceCircle({navigation, total}: any) {

  const [hide, setHide] = useState(false);

  return (
    <SafeAreaView style={style.container}>

      <View>

        <TouchableOpacity style={style.circle} onPress={() => {
            setHide(!hide)
          }}
        >

          <Text style={style.text}>Seu balanço total</Text>
          <Text style={style.totalNum}>R$ {!hide ? total : '******'}</Text>

          <View style={style.iconContainer}>
            <Text style={style.text}>Hide</Text>

            <Icon
              style={style.icon}
              name={!hide ? 'eye-outline' : 'eye-off-outline'}
            />
          </View>

        </TouchableOpacity>

      </View>


    </SafeAreaView>
  );
}
