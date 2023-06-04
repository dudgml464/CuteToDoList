import { View, StyleSheet } from 'react-native';
import { TextInput, DefaultTheme } from 'react-native-paper';
import IconButton from './IconButton';

const inputTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#F37A22', 
    accent: '#F37A22',
  },
};

const InputForm = ({ todo, setTodo, addTodo }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
        theme={inputTheme}
      />
      <IconButton
        icon="add"
        color="#F37A22"
        size={24}
        onPress={addTodo}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    flexGrow: 1,
    marginRight: 10,
  },
});

export default InputForm;
