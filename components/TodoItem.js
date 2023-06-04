import { View, Text, TextInput, StyleSheet } from "react-native";
import Toggle from "react-native-toggle-element";
import React, { useState } from 'react';
import { IconButton } from 'react-native-paper';
const TodoItem = ({ item, toggleCompleted, updateTodoText }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(item.todo);

  const toggleEditing = (id, currentState) => {
    setIsEditing(!currentState);
  };

  const onSubmitEditing = (id, newText) => {
    updateTodoText(id, newText);
    toggleEditing(id, isEditing);
  };

  return (
    <View style={styles.rowFront}>
      {isEditing ? (
        <TextInput
          style={[
            styles.todoText,
            item.completed ? styles.todoTextCompleted : null,
          ]}
          value={text}
          onChangeText={setText}
          onBlur={() => onSubmitEditing(item.id, text)}
          autoFocus
        />
      ) : (
        <Text
          onPress={() => toggleEditing(item.id, isEditing)}
          style={[
            styles.todoText,
            item.completed ? styles.todoTextCompleted : null,
          ]}
        >
          {item.todo}
        </Text>
      )}
      <View style={styles.toggleButton}>
        <Toggle
          value={item.completed}
          onPress={() =>
            toggleCompleted(item.id, item.completed)
          }
          leftTitle=<IconButton icon="close" color="white" size={24} onPress={() => toggleCompleted(item.id, item.completed)} />
          rightTitle=  <IconButton icon="check" color="white" size={24} onPress={() => toggleCompleted(item.id, item.completed)} />
          trackBar={styles.customTrackBar}
          thumbButton={styles.customThumbButton}
        />

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowFront: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 12,
  },
  todoText: {
    fontWeight: '500',
    fontSize: 16,
  },
 todoTextCompleted: {
    color: '#B2BB2',
    textDecorationLine: 'line-through',
  },
  toggleButton: {
    marginLeft: 15,
  },
  customThumbButton: {
    height: 30,
    width: 30,
    borderRadius: 30,
    activeBackgroundColor: "white",
    inactiveBackgroundColor: "white",
    borderColor: "#E9E9EA",
    borderWidth: 1,
  },
  customTrackBar: {
    activeBackgroundColor: "green",
    inactiveBackgroundColor: "red",
    borderColor: "#E9E9EA",
    borderWidth: 1,
    width: 60,
    height: 30,
    borderRadius: 30,
  },
});

export default TodoItem;


