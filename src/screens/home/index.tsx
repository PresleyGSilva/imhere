import React, {useState} from "react";
import { Text, TextInput, TouchableOpacity, View,  FlatList, Alert } from "react-native";


import { styles } from "./styles";
import { Participant } from "../../components/Participant";

export default function Home() {
  const [participants, setParticipants] = useState<string[]>([])
  const [participantName, setParticipantName] = useState('')

 
  
  function handleParticipantAdd() {
    if(participants.includes(participantName)){
      return Alert.alert('Participante existe', 'Ja existe um participante na lista com esse nome')
    }
    setParticipants(prevState => [...prevState, participantName])
    setParticipantName('')
    
  }
  function handleParticipantRemove(name:string) {
    
    
    Alert.alert('Remover participante', `Deseja remover ${name}?`, [
      {
        text: 'Não',
        style: 'cancel'
      },
      {
        text: 'Sim',
        onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))
      }
    ])
    
  }
  

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Amigo Secreto Interas
      </Text>

      <Text style={styles.eventDate}>
        Sexta, 21 de Dezembro de 2023.
      </Text>

      <View style={styles.form}>
        <TextInput 
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          onChangeText={setParticipantName}
          value={participantName}
        />
        
        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
      data= {participants}
      keyExtractor={item => item}
      renderItem={({item}) => (
        <Participant 
          key={item}
          name={item}
          onRemove={()=> handleParticipantRemove(item)}/>
      )}
    />

     
      

      

    </View>
  )
}