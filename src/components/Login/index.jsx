import { useState } from 'react'
import { StyleSheet, Text, SafeAreaView, TextInput, TouchableOpacity} from 'react-native'

import firebase from '../../firebaseConnection'



export function Login({ changeStatus }){
    const [type, setType] = useState('login')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

 

    async function handleSignIn(){
        
    if(type === 'login') { 
    const user =  await firebase.auth().signInWithEmailAndPassword(email, password)
        .then( (user) => {
           
            changeStatus(user.user.uid)

        }).catch( (error) => {
            console.log(error)
            alert('Ops. Alguma coisa deu errado')
            return

        })
    }else {
        const user =  await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then( (user) => {
            changeStatus(user.user.uid)

        }).catch( (error) => {
            console.log(error)
            alert('Ops. Alguma coisa deu errado')
            return

        })

    }
    }

  return (
        <SafeAreaView style={style.container}>
            <TextInput 
             placeholder='Seu Email'
             style={style.input}
             value={email}
             onChangeText={ (text) => setEmail(text)}
             />

            <TextInput 
             placeholder='Senha'
             style={style.input}
             value={password}
             onChangeText={ (text) => setPassword(text)}
             />

             <TouchableOpacity style={[style.button, {backgroundColor: type === 'login' ? '#3ea6f2' : '#141414'} ]} onPress={handleSignIn}>
                <Text style={style.textLogin}>
                   {type === 'login' ? 'Acessa' : 'Cadastrar'} 
                </Text>
             </TouchableOpacity>

             <TouchableOpacity onPress={ () => setType( type => type === 'login' ? 'cadastrar' : 'login')}>
                <Text style={{textAlign: 'center'}}>
                  {type === 'login' ? 'Criar uma conta' : 'Já possuo ua conta'}    
                </Text>
             </TouchableOpacity>

        </SafeAreaView>

    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 70,
        paddingTop: 40,
        paddingHorizontal: 10,
        backgroundColor: '#f2f6fc'
    }, 
    input: {
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 4,
        height: 45,
        padding: 10,
        borderWidth: 1,
        borderColor: '#141414'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#141414',
        height: 45,
        marginBottom: 10
    },
    textLogin: {
        color: '#fff',
        fontSize: 17,
        

    }
})