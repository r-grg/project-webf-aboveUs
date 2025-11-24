import React from "react"
import { View, StyleSheet } from "react-native"
import { TextInput, Chip } from "react-native-paper"
import { SortOption } from "../types/Ufo"

interface SearchBarProps {
  value: string
  onChangeText: (text: string) => void
  sortOption: SortOption
  onChangeSortOption: (value: SortOption) => void
}

export const SearchBar = ({
  value,
  onChangeText,
  sortOption,
  onChangeSortOption,
}: SearchBarProps) => {
  
  const toggleSort = () => {
    onChangeSortOption(sortOption === "Recent" ? "Oudste" : "Recent")
  }

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        placeholder="zoek"
        value={value}
        onChangeText={onChangeText}
        left={<TextInput.Icon icon="magnify" />}
        style={styles.input}
        theme={{ roundness: 30 }}
      />
      <Chip
        mode="outlined"
        onPress={toggleSort}
        icon="swap-vertical"
        style={styles.chip}
        textStyle={{ fontSize: 13 }}
      >
        {sortOption}
      </Chip>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  input: {
    width: "100%",
  },
  chip: {
    alignSelf: "flex-end",
    borderRadius: 12,
    paddingHorizontal: 6,
  },
})
