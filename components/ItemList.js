import {
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';
import TodoItem from "./TodoItem";
const ItemList = ({ todos, toggleCompleted, updateTodoText, deleteTodo }) => {
  return (
    <SwipeListView
      closeOnRowPress
      data={todos}
      renderItem={({ item }) => (
        <TodoItem
          item={item}
          toggleCompleted={toggleCompleted}
          deleteTodo={deleteTodo}
          updateTodoText={updateTodoText}
        />
      )}
      renderHiddenItem={({ item }) => (
        <View style={styles.rowBack}>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteTodo(item.id)}
            activeOpacity={0.5}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          >
            <Icon name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )}
      rightOpenValue={-75}
    />
  );
};
const styles = StyleSheet.create({
  rowBack: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 20,
    backgroundColor: '#F37A22',
    width: '100%',
    marginVertical: 10,
    borderRadius: 15,
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
   deleteButton: {
    width: 75,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingLeft: 25, 
  },
});

export default ItemList;
