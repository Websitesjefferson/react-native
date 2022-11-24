import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native'
import Feather from '@expo/vector-icons/Feather'


export function TaskList({data, deleteItem, editItem}){
    return(
        <View style={style.container}>
            <TouchableOpacity style={{ marginRight: 10}} onPress={ () => deleteItem(data.key)}>
              <Feather name='trash' color='#fff' size={20}/>
            </TouchableOpacity>

            <View style={{paddingRight: 10}}>
                <TouchableWithoutFeedback onPress={ () => editItem(data)}>
                  <Text style={{ color:'#fff', paddingRight: 10}}>{data.nome}</Text>
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#121212',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        borderRadius: 4

    }
})