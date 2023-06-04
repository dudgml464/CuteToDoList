import { View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import IconButton from './IconButton';

const AddItem = ({ todo, setTodo, addTodo }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={todo}
        onChangeText={setTodo}
        placeholder="Add a new todo"
        mode="outlined"
        dense
        onSubmitEditing={addTodo}
        blurOnSubmit={true}
        multiline={false}
      />
      <IconButton icon="add" color="#F37A22" size={24} onPress={addTodo} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3EEE3',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  input: {
    flexGrow: 1,
    marginRight: 10,
  },
});


export default AddItem;

