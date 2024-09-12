import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import style from './style.balance';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { gold, lightGreen, red } from '../../../../shared/utils/style-constants';

export default function BalanceCircle({ navigation, total }: any) {

  const [hide, setHide] = useState(false);

  return (
    <SafeAreaView style={style.container}>

      <View>

        <TouchableOpacity style={{
          ...style.circle,
          shadowColor: parseFloat(total) < 0 ? red : lightGreen
        }}
          onPress={() => {
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
