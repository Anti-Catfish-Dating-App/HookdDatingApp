import React from "react"
import { useController, useForm } from "react-hook-form"
import { StyleSheet, TextInput } from "react-native"

export const InputForm = ({ name, control }) => {
  const { field } = useController({
    control,
    defaultValue: "",
    name,
  })

  return (
    <TextInput
      value={field.value}
      onChangeText={field.onChange}
      style={styles.input}
      placeholder={`Enter your ${field.name}`}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    margin: 12,
    width: 250,
    borderWidth: 2,
    padding: 10,
  },
})
