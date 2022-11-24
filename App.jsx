import { useState, useEffect, useRef} from 'react'
import { StyleSheet, View, Text, SafeAreaView, TextInput, TouchableOpacity, FlatList, Keyboard} from 'react-native'


import { Login } from './src/components/Login'
import { TaskList } from './src/components/Tasklist'

import firebase from './src/firebaseConnection'
import Feather from '@expo/vector-icons/Feather'


export default function App() {
  const [newText, setNewText] = useState('')
  
  const [tasks, setTasks] = useState([])
  const [user, setUser] = useState(null)
  const [key, setKey] = useState('')

  const inputRef = useRef(null)

  useEffect(() => {

    function getUser(){

      if(!user){
        return
      }

      firebase.database().ref('tarefas').child(user).once('value', (snapshot) => {
        setTasks([])

        snapshot?.forEach( (childItem) => {
            let data = {
              key: childItem.key,
              nome: childItem.val().nome
            }
            setTasks( OldTasks => [...OldTasks, data])
        })
      })
    }

    getUser()
  },[user])

async  function handleDelete(key){
    await firebase.database().ref('tarefas').child(user).child(key).remove()

    .then(() => {
      const findTask = tasks.filter( item => item.key !== key)
      setTasks(findTask)
    })

  }
  function handleEdit(data){
    setKey(data.key)
    setNewText(data.nome)
    inputRef.current.focus()
    
  }

  function cancelEdit(){
    setKey('')
    setNewText('')
    Keyboard.dismiss()
  }
async  function handleAdd(){

      if(newText === ''){
        return
      }

      if(key !== ''){
        firebase.database().ref('tarefas').child(user).child(key).update({
          nome: newText
        })
        .then(() => {
           const tasksIndex = tasks.findIndex((item) => item.key === key)
           const tasksClone = tasks
           tasksClone[tasksIndex].nome = newText

           setTasks([...tasksClone])

          
        })
          Keyboard.dismiss()
          setNewText('')
          setKey('')
          return
      }

      let tarefas = firebase.database().ref('tarefas').child(user)
      let chave = tarefas.push().key

      tarefas.child(chave).set({
        nome: newText
      })
      .then(() => {
        const data = {
          key: chave,
          nome: newText
        }

        setTasks( OldTasks => [...OldTasks, data])
      
        Keyboard.dismiss()
        setNewText('')
      
      })

    


  }

  if(!user){
    return <Login changeStatus={ (user) => setUser(user)} />
}


  return (
      <SafeAreaView style={style.container}>
      { key.length > 0 && (
        <View style={{ marginBottom: 8,}}>
          <TouchableOpacity style={{alignItems: 'center', flexDirection: 'row',}} onPress={cancelEdit}>
             <Feather name='x-circle' Size={20} color='#ff0000' />
             <Text style={{ marginLeft: 7, color:'#ff0000'}}>
               Cancelar
             </Text>
           </TouchableOpacity>
        </View>
      )}
        <View style={style.view}>
            <TextInput 
            style={style.input} 
            placeholder='cadastrar nova tarefa'
            value={newText}
            onChangeText={ (text) => setNewText(text)}
            ref={inputRef}/>
  
            <TouchableOpacity style={style.button} onPress={handleAdd}>
              <Text style={style.buttonText}>+</Text>
            </TouchableOpacity>

        </View>

        <FlatList 
          data={tasks}
          keyExtractor={ item => item.key}
          renderItem={ ({item}) => (
            <TaskList data={item} deleteItem={handleDelete} editItem={handleEdit}/>
  )}/>

      </SafeAreaView>

  )
}

const style = StyleSheet.create({
  container: {
      flex: 1,
      paddingTop: 50,
      paddingHorizontal: 20,
      backgroundColor: '#f2f6fc'
  }, 
  view: {
    flexDirection: 'row'
  },
   input: {
    flex: 1, 
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#141414',
    height: 45
   },
   button: {
     backgroundColor: '#141414',
     height: 45, 
     alignItems: 'center',
     justifyContent: 'center',
     marginLeft: 5,
     paddingHorizontal: 14,
     borderRadius: 4
   },
   buttonText: {
     color: '#fff',
     fontSize: 22
   }
})


