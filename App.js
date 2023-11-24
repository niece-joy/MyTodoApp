import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

const App = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  const handleAddTask = () => {
    if (task) {
      if (editIndex !== -1) {
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = task;
        setTasks(updatedTasks);
        setEditIndex(-1);
      } else {
        setTasks([...tasks, task]);
      }
      setTask("");
    }
  };

  const handleEditTask = (index) => {
    const taskToEdit = tasks[index];
    setTask(taskToEdit);
    setEditIndex(index);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const getRainbowColor = (index) => {
    const rainbowColors = [
      "#FF5E78", // Pink
      "#FF9167", // Orange
      "#FFD56A", // Yellow
      "#69FF94", // Green
      "#6A81FF", // Blue
      "#C966FF", // Purple
      "#FF6F91", // Red
    ];
    return rainbowColors[index % rainbowColors.length];
  };

  const addButtonColor = editIndex !== -1 ? "#FF5E78" : "#C966FF";

  const renderItem = ({ item, index }) => (
    <View style={[styles.task, { backgroundColor: getRainbowColor(index) }]}>
      <View style={{ flex: 1 }}>
        <Text style={styles.itemList}>{item}</Text>
      </View>
      <View style={styles.taskButtons}>
        <TouchableOpacity onPress={() => handleEditTask(index)}>
          <Text style={[styles.editButton, { color: "#fff", backgroundColor: getRainbowColor(index) }]}>
            Modify
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteTask(index)}>
          <Text style={[styles.deleteButton, { color: "#fff", backgroundColor: getRainbowColor(index) }]}>
            Remove
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My TodoList App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter task"
        value={task}
        onChangeText={(text) => setTask(text)}
      />
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: addButtonColor }]}
        onPress={handleAddTask}
      >
        <Text style={styles.addButtonText}>
          {editIndex !== -1 ? "Update Task" : "Add Task"}
        </Text>
      </TouchableOpacity>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
    backgroundColor: "#f4f4f4", // Light Gray background
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#444",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 7,
    color: "#5e5e5e", // Dark Gray
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    fontSize: 18,
    backgroundColor: "#fff",
  },
  addButton: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  task: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    padding: 15,
    borderRadius: 8,
    shadowColor: "#333",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemList: {
    fontSize: 19,
    color: "#333",
  },
  taskButtons: {
    flexDirection: "row",
  },
  editButton: {
    marginRight: 10,
    fontWeight: "bold",
    fontSize: 18,
    padding: 8, // Increased padding
    borderRadius: 5, // Added borderRadius
  },
  deleteButton: {
    fontWeight: "bold",
    fontSize: 18,
    padding: 8, // Increased padding
    borderRadius: 5, // Added borderRadius
  },
});

export default App;
