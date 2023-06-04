import React, { useState, useEffect } from "react";
import {
  View,
 Text,
  StyleSheet,
  useWindowDimensions 
} from "react-native";
import { Provider, DefaultTheme, Card } from "react-native-paper";
import { db } from "./firebaseConfig";
import CuteCat from "./components/CuteCat";
import InputForm from "./components/InputForm";
import ItemList from "./components/ItemList";
import * as Font from 'expo-font';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#F37A22',
    accent: '#F37A22',
  },
};

export default function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'Cat': require('./assets/Cat.otf'),
    });
    setIsLoaded(true);
  }

  useEffect(() => {
    const unsubscribe = db.collection("todos").onSnapshot((snapshot) => {
      setTodos(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id, isEditing: false }))
      );
    });

     loadFonts();

    return () => { unsubscribe(); }
  }, []);
  

  const addTodo = async () => {
    if (todo.trim() === '') {
      return;
    }
    try {
      await db.collection("todos").add({
        todo: todo,
        completed: false,
        createdAt: new Date()
      });
      setTodo('');
    } catch (error) {
      console.log(error.message);
    }
  };

  const toggleCompleted = async (id, currentState) => {  
    try {
      await db.collection("todos").doc(id).update({ completed: !currentState });
    } catch (error) {
      console.log(error.message);
    }
  };

    const toggleEditing = (id, currentState) => {
      setTodos((prevTodos) =>
        prevTodos.map((item) => {
          if (item.id === id) {
            if (!item.isEditing) {
              item.isEditing = !currentState;
            }
          } else {
            item.isEditing = false;
          }
          return item;
        })
      );
    };


  const updateTodoText = async (id, newText) => {
    try {
        await db.collection("todos").doc(id).update({ todo: newText });
      } catch (error) {
        console.log(error.message);
      }
  };

  const deleteTodo = async (selectedId) => {
    try{
      await db.collection("todos").doc(selectedId).delete();
    } catch (error) {
      console.log(error.message);
    }
  };

  const screenWidth = useWindowDimensions().width;
  if (!isLoaded) return null;
  return (
    <View style={theme}>
      <Card style={styles.itemCard}>
        <Card.Content
 style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        }}
        >
            <View style={[styles.container, { maxWidth: screenWidth }]}>
              <CuteCat />
              <Text style={[styles.title, { fontFamily: 'Cat' }]}>Cute To Do List</Text>
              <InputForm todo={todo} setTodo={setTodo} addTodo={addTodo} />
              <ItemList
                todos={todos}
                toggleCompleted={toggleCompleted}
                toggleEditing={toggleEditing}
                updateTodoText={updateTodoText}
                deleteTodo={deleteTodo}
              />
            </View>
        </Card.Content>
      </Card>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3EEE3',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 30,
  },
  itemCard: {
    marginVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    elevation: 4,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {
    width: 1,
    height: 4,
  },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
});